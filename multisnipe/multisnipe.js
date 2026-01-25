const { Client } = require('discord.js-selfbot-v13');
const colors = require('colors');
const readline = require('readline-sync');

async function run() {
    console.clear();
    console.log(`${"--- AGGRESSIVE MULTI-BOT MODE ---".white}\n`);
    
    const rawTokens = readline.question("Tokens (virgul ile ayirin): ");
    const tokens = rawTokens.split(',').map(t => t.trim()).filter(t => t.length > 5);
    const guildId = readline.question("Guild ID: ");
    const vanity = readline.question("Target Vanity: ");

    const clients = [];
    let isFinished = false;
    let checkCount = 0;
    const startTime = Date.now();

    console.log(`\n${"[SYSTEM]".cyan} Tokenlar sisteme baglanıyor, lütfen bekleyin...`);

    
    for (const token of tokens) {
        const client = new Client({ checkUpdate: false });
        client.on('ready', () => {
            
        });
        client.login(token).catch(() => {});
        clients.push(client);
    }

    
    const interval = setInterval(async () => {
        if (isFinished) return clearInterval(interval);

        
        const activeClients = clients.filter(c => c.isReady());
        if (activeClients.length === 0) return;

        try {
            
            const invite = await activeClients[0].fetchInvite(vanity).catch(() => null);
            
            if (!invite) {
                isFinished = true;
                clearInterval(interval);
                process.stdout.write('\n'); 
                console.log(`${"[ALERT]".yellow} Vanity bosta! Tum botlar saldırıya geciyor...`);

                clients.forEach(async (c) => {
                    if (c.isReady()) {
                        const g = c.guilds.cache.get(guildId);
                        if (g) {
                            g.setVanityCode(vanity)
                                .then(() => {
                                    console.log(`${"[WIN]".green} ${c.user.tag} tarafından alındı!`);
                                    process.exit();
                                })
                                .catch(() => {
                                    
                                });
                        }
                    }
                });
            } else {
                checkCount++;
                const elapsed = Math.floor((Date.now() - startTime) / 1000);
                const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
                const seconds = (elapsed % 60).toString().padStart(2, '0');
                
                
                process.stdout.write(`\r${"[STATUS]".magenta} Sure: ${minutes}:${seconds} | Kontrol: ${checkCount} | Aktif Bot: ${activeClients.length}/${tokens.length} | Hedef: ${vanity} `.white);
            }
        } catch (e) {}
    }, 350);
}


module.exports = { run };
