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
    const supportedLangs = ['en', 'fr', 'tr', 'es'];
    defaultLang = supportedLangs.includes(browserLang) ? browserLang : 'en';

    const langFile = `../langs/${defaultLang}.json`;

    fetch(langFile)
        .then(response => response.json())
        .then(() => {
            document.getElementById('language-selector').value = defaultLang;
            document.getElementById('language-selector').dispatchEvent(new Event('change'));
        })
        .catch(error => {
            console.error('Error loading default language file:', error);
            defaultLang = 'en';
            document.getElementById('language-selector').value = defaultLang;
            document.getElementById('language-selector').dispatchEvent(new Event('change'));
        });
} else {
    document.getElementById('language-selector').value = defaultLang;
    document.getElementById('language-selector').dispatchEvent(new Event('change'));
}
