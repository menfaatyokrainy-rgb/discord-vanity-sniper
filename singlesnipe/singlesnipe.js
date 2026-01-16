const { Client } = require('discord.js-selfbot-v13');
const colors = require('colors');
const readline = require('readline-sync');

async function run() {
    console.clear();
    console.log(`${"--- SINGLE PRECISION MODE ---".white}\n`);
    
    const token = readline.question("Token: ", { hideEchoBack: true });
    const guildId = readline.question("Guild ID: ");
    const vanity = readline.question("Target Vanity: ");

    const client = new Client({ checkUpdate: false });
    let checkCount = 0;
    const startTime = Date.now();

    client.on('ready', () => {
        console.log(`\n${"[SYSTEM]".green} ${client.user.tag} aktif. İzleme başlatıldı.\n`);
        
        const monitor = setInterval(async () => {
            try {
                const invite = await client.fetchInvite(vanity).catch(() => null);
                
                if (!invite) {
                    clearInterval(monitor);
                    process.stdout.write('\n'); // Satırı temizle
                    console.log(`${"[ALERT]".yellow} Vanity boşa düştü! Alım deneniyor...`);
                    
                    const guild = client.guilds.cache.get(guildId);
                    if (!guild) {
                        console.log(`${"[ERROR]".red} Sunucu bulunamadı.`);
                        process.exit();
                    }

                    await guild.setVanityCode(vanity)
                        .then(() => {
                            console.log(`${"[WIN]".green} URL başarıyla alındı!`);
                            process.exit();
                        })
                        .catch(err => {
                            console.log(`\n${"--- HATA ---".red}`);
                            console.log(`${"[FAILED]".red} Sebep: ${err.message}`);
                            process.exit();
                        });
                } else {
                    checkCount++;
                    const elapsed = Math.floor((Date.now() - startTime) / 1000);
                    const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
                    const seconds = (elapsed % 60).toString().padStart(2, '0');
                    
                    // Konsolu kirletmeden aynı satırı günceller
                    process.stdout.write(`\r${"[STATUS]".cyan} Süre: ${minutes}:${seconds} | Kontrol: ${checkCount} | Hedef: ${vanity} `.white);
                }
            } catch (e) {}
        }, 350);
    });

    client.login(token).catch(() => {
        console.log(`${"[ERROR]".red} Token geçersiz!`);
        process.exit();
    });
}

module.exports = { run };