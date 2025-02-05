document.getElementById('language-selector').addEventListener('change', function() {
    const selectedLang = this.value;
    localStorage.setItem('selectedLang', selectedLang);
    const langFile = `../langs/${selectedLang}.json`;

    fetch(langFile)
        .then(response => response.json())
        .then(data => {
            document.querySelectorAll('[data-lang]').forEach(element => {
                const langKey = element.getAttribute('data-lang');
                if (data[langKey]) {
                    element.innerHTML = data[langKey];
                }
            });
        })
        .catch(error => console.error('Error loading language file:', error));
});

let defaultLang = localStorage.getItem('selectedLang');

if (!defaultLang) {
    const browserLang = navigator.language.slice(0, 2);
    const langFile = `../langs/${browserLang}.json`;

    fetch(langFile)
        .then(response => response.json())
        .then(data => {
            if (data) {
                defaultLang = browserLang;
            } else {
                defaultLang = 'en';
            }

            document.getElementById('language-selector').value = defaultLang;
            document.getElementById('language-selector').dispatchEvent(new Event('change'));
        })
        .catch(error => {
            defaultLang = 'en';
            document.getElementById('language-selector').value = defaultLang;
            document.getElementById('language-selector').dispatchEvent(new Event('change'));
        });
} else {
    document.getElementById('language-selector').value = defaultLang;
    document.getElementById('language-selector').dispatchEvent(new Event('change'));
}
