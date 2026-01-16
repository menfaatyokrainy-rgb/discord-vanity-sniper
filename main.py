import os
import sys
import time
from colorama import Fore, init

init(autoreset=True)

sys.path.append(os.path.join(os.path.dirname(__file__), 'singlesnipe'))
sys.path.append(os.path.join(os.path.dirname(__file__), 'multisnipe'))

def banner():
    art = f"""
    {Fore.CYAN}    ____             _                ____               
    {Fore.CYAN}   / __ \ ____ _ (_)____   __  __  /  _/____   _____   
    {Fore.CYAN}  / /_/ // __ `// // __ \ / / / /  / / / __ \ / ___/   
    {Fore.CYAN} / _, _// /_/ // // / / // /_/ / _/ / / / / // /__     
    {Fore.CYAN}/_/ |_| \__,_//_//_/ /_/ \__, / /___//_/ /_/ \___/     
    {Fore.CYAN}                        /____/                         
    {Fore.WHITE}           --- PREMIUM VANITY SNIPER ---
    {Fore.CYAN}           DEVELOPED BY RAINYINC | 2026
    {Fore.MAGENTA}         CONTACT / SUPPORT DISCORD: incrainy
    """
    print(art)

def legal_warning():
    os.system('cls' if os.name == 'nt' else 'clear')
    print(f"{Fore.RED}{'='*60}")
    print(f"{Fore.RED}                 YASAL UYARI / LEGAL DISCLAIMER")
    print(f"{Fore.RED}{'='*60}")
    print(f"{Fore.WHITE}")
    print(" Bu yazilim (RainyInc Sniper) tamamen EGITIM ve TEST amaclidir.")
    print(" Self-bot kullanimi Discord Hizmet Kosullarina (ToS) aykiridir.")
    print(" Bu aracin kullanimindan dogacak hesap kapanmalari, banlanmalar")
    print(" veya yasal sorunlardan gelistirici (RainyInc) sorumlu TUTULAMAZ.")
    print(f"{Fore.WHITE}")
    print(f" Tum istek, oneri ve iletisim icin Discord: {Fore.CYAN}incrainy")
    print(f"{Fore.WHITE}")
    print(" Programi kullanarak tum sorumlulugu kabul etmis sayilirsiniz.")
    print(f"{Fore.RED}{'='*60}")
    print(f"{Fore.YELLOW}")
    
    agree = input(" Devam etmek icin 'KABUL' yazip Enter'a basin: ")
    
    if agree != "KABUL":
        print(f"\n{Fore.RED}[!] Sartlar kabul edilmedi. Program kapatiliyor...")
        time.sleep(2)
        sys.exit()
    
    print(f"{Fore.GREEN}[+] Sartlar kabul edildi. RainyInc baslatiliyor...")
    time.sleep(1)

def menu():
    os.system('cls' if os.name == 'nt' else 'clear')
    banner()
    print(f"{Fore.CYAN}[01]{Fore.WHITE} Single Attack Mode")
    print(f"{Fore.CYAN}[02]{Fore.WHITE} Multi Attack Mode")
    print(f"{Fore.CYAN}[03]{Fore.WHITE} Exit")
    print(f"\n{Fore.MAGENTA}Support & Contact Discord: incrainy")
    
    choice = input(f"\n{Fore.CYAN}RainyInc@Selection: {Fore.WHITE}")
    
    if choice == "1":
        try:
            import single_attack
            single_attack.run()
        except ImportError:
            print(f"{Fore.RED}[ERROR] single_attack.py not found in singlesnipe folder.")
            input()
    elif choice == "2":
        try:
            import multi_attack
            multi_attack.run()
        except ImportError:
            print(f"{Fore.RED}[ERROR] multi_attack.py not found in multisnipe folder.")
            input()
    else:
        print(f"\n{Fore.CYAN}RainyInc Systems Shutting Down...")
        print(f"{Fore.WHITE}Contact for custom projects: incrainy")
        time.sleep(2)
        sys.exit()

if __name__ == "__main__":
    legal_warning()
    
    while True:
        menu()