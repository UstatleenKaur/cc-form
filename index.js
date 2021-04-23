function Card (options) {
    this.values = {};
    this.defaultValues = {
        name: 'YOUR NAME HERE',
        cvv: '***',
        number: '•••• •••• •••• ••••',
        expiry: '••/••',
    }
    
    this.attachEventListeners();
    this.cardTemplate = document.getElementById('card-container');
    this.updateUI();
}

Card.prototype.attachEventListeners = function () {
    const cvv = document.querySelector('[name="card-cvv"]');
    if (cvv) {
        cvv.addEventListener('focus', () => {
            this.cardTemplate.querySelector('.card').classList.add('card--flipped');
        });
        cvv.addEventListener('blur', () => {
            this.cardTemplate.querySelector('.card').classList.remove('card--flipped');
        });
    }
    document.addEventListener('keydown', ev => {
        const el = ev.target;
        const name= el.getAttribute('name');
        if(name === 'card-number') {
            this.cNumChange(ev);
        }
        if(name === 'card-name') {
            this.cNameChange(ev);
        }
        if(name === 'card-expiry') {
            this.cValidityChange(ev);
        }
        if(name === 'card-cvv') {
            this.cCvvChange(ev);
        }
    });

    document.addEventListener('keyup', ev => {
        const el = ev.target;
        const name= (el.getAttribute('name') || '').replace('card-', '');
        if (name) {
            // if (name === 'name') {
            //     ev.target.value = ev.target.value.toUpperCase();
            // }
            this.values[name] = ev.target.value.toUpperCase();
            this.updateUI(name);
        }
    });
};

Card.prototype.cNumChange = function (ev) {

    if (
        // Allow: backspace, delete, tab, escape, enter, home, end, left, right, down, up respectively
        [8, 46, 9, 27, 13, 36, 35, 37, 38, 39, 40].includes(ev.keyCode) || 
        // Allow: Ctrl+A, Command+A
        (ev.keyCode === 65 && (ev.ctrlKey === true || ev.metaKey === true))) {
            return;
        }

    if (
        // Allow numbers
        (ev.keyCode >= 48 && ev.keyCode <= 57 && ev.target.value.length < 19)
    ) {
        // let it happen, don't do anything
        if ((ev.target.value.length + 1) % 5 === 0) {
            ev.target.value = ev.target.value + ' ';
        }
        return;
    }

    ev.preventDefault();
}
Card.prototype.cNameChange = function (ev) {
    if (
        // Allow: backspace, delete, tab, escape, enter, home, end, left, right, down, up respectively
        [8, 46, 9, 27, 13, 36, 35, 37, 38, 39, 40].includes(ev.keyCode) || 
        // Allow: Ctrl+A, Command+A
        (ev.keyCode === 65 && (ev.ctrlKey === true || ev.metaKey === true))) {
            return;
        }

    if ((ev.keyCode >= 65 && ev.keyCode <= 91) || (ev.keyCode >= 97 && ev.keyCode <= 123) || ev.keyCode == 32) {
        return;
    }

    ev.preventDefault();
}
Card.prototype.cValidityChange = function (ev) {
    if (
        // Allow: backspace, delete, tab, escape, enter, home, end, left, right, down, up respectively
        [8, 46, 9, 27, 13, 36, 35, 37, 38, 39, 40].includes(ev.keyCode) || 
        // Allow: Ctrl+A, Command+A
        (ev.keyCode === 65 && (ev.ctrlKey === true || ev.metaKey === true))) {
            return;
        }

        if (
            // Allow numbers
            (ev.keyCode >= 48 && ev.keyCode <= 57 && ev.target.value.length < 5)
        ) {
            // let it happen, don't do anything
            if ((ev.target.value.length + 1) % 3 === 0) {
                ev.target.value = ev.target.value + '/';
            }
            return;
        }

    ev.preventDefault();
}
Card.prototype.cCvvChange = function (ev) {
    if (
        // Allow: backspace, delete, tab, escape, enter, home, end, left, right, down, up respectively
        [8, 46, 9, 27, 13, 36, 35, 37, 38, 39, 40].includes(ev.keyCode) || 
        // Allow: Ctrl+A, Command+A
        (ev.keyCode === 65 && (ev.ctrlKey === true || ev.metaKey === true))) {
            return;
        }

        if (
            // Allow numbers
            (ev.keyCode >= 48 && ev.keyCode <= 57 && ev.target.value.length < 3)
        ) {
            return;
        }

    ev.preventDefault();
}


Card.prototype.updateUI = function (key) {
    if (key) {
        const elem = document.getElementsByClassName(`card-${key}`)[0];
        if (elem) {
            elem.innerHTML = this.values[key] || this.defaultValues[key];
            return;
        }
    }

    this.cardTemplate.innerHTML = this.updateTemplate(this.template);
};

Card.prototype.template = `
    <div class="flex br3 overflow-hidden shadow-2 relative card border-box w-100 mb0 mb4-l card">
    <div class="flex flex-column pa3 pa4-l flex-grow-1 relative  card-front justify-end">
        <div class="card-shiny"></div>
        <div class="card-number card-display white mb4 f2">{{number}}</div>
        <div class="flex justify-between">
            <div class="card-name card-display white">{{name}}</div>
            <div class="flex flex-column">
                <span class="white">valid thru</span>
                <div class="card-expiry card-display white mt2" data-before="{{monthYear}}" data-after="{{validDate}}">{{expiry}}</div>
            </div>
        </div>
    </div>
    <div class="card-back flex flex-column items-center justify-center flex-grow-1 pa3 absolute w-100 h-100 top-0 left-0">
        <div class="card-bar"></div>
        <div class="card-bar"></div>
        <div class="flex justify-between w-90 items-center">
            <div class="white-bar"></div>
            <div class="card-cvv card-d≥isplay white">{{cvv}}</div>
        </div>
        <div class="card-shiny"></div>
    </div>
    </div>
`;

Card.prototype.updateTemplate = function(tpl) {
    return tpl.replace(/\{\{(.*?)\}\}/g, (match, key, str) => {
      return this.values[key] || this.defaultValues[key];
    });
  };

Card.prototype.cardTypes = ['card-maestro', 'card-mastercard', 'card-visa', 'card-visaelectron'];

new Card({});