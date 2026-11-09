let balance = 1000;
let pin = prompt("Создайте пароль:");
let failCount = 3;
let dayLimit = 2000;
let withdrawn = 0;
let added = 0;
let operationCount = 0;
let running = true;

while (failCount > 0) {
    let pinCheck = prompt("Введите пароль:");
    if (pinCheck == pin) {
        while (running) {
            let option = prompt("Банкомат\n1 — баланс\n2 — снять\n3 — пополнить\n4 — баланс в USD и EUR\n0 — выход");
            switch (option) {
                case "1":
                    alert(`Баланс: ${balance} AZN`);
                    break;
                case "2":
                    let amount = Number(prompt("Введите число для снятия:"));
                    if (!(amount>0)) {
                        alert("Число должно быть больше 0.");
                    } 
                    else if (amount % 5 != 0) {
                        alert("Число должно быть кратна 5.");
                    } 
                    else {
                        let fee = amount > 500 ? amount * 0.01 : 0;
                        let total = amount + fee;
                        if (total > dayLimit) {
                            alert(`Превышен лимит. Осталось: ${dayLimit}`);
                        } 
                        else if (total > balance) {
                            alert("Недостаточно средств.");
                        } 
                        else {
                            balance -= total;
                            dayLimit -= total;
                            withdrawn += amount;
                            operationCount++;
                            alert(`Снято: ${amount}, комиссия: ${fee}`);
                        }
                    }
                    break;
                case "3":
                    let deposit = Number(prompt("Введите число для пополнения:"));
                    if (!(deposit>0)) {
                        alert("Число должно быть больше 0.");
                    } 
                    else if (deposit % 5 != 0) {
                        alert("Число должно быть кратна 5.");
                    } 
                    else {
                        balance += deposit;
                        added += deposit;
                        operationCount++;
                        alert(`Пополнено: ${deposit}`);
                    }
                    break;
                case "4":
                    alert(`USD: ${balance * 0.59}\nEUR: ${balance * 0.53}`);
                    break;
                case "0":
                    alert(`Снято: ${withdrawn}\nПополнено: ${added}\nОпераций: ${operationCount}`);
                    running = false;
                    break;
                default:
                    alert("Нет такого пункта.");
            }
        }
        break;
    } 
    else {
        failCount--;
        alert(`Неверный пароль! Осталось попыток: ${failCount}`);
        if (failCount == 0) {
            alert("Карта заблокирована :D");
        }
    }
}