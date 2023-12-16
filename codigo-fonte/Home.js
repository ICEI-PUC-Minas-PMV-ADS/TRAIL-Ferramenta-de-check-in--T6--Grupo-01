function clickMenu() {
    var itens = document.getElementById('itens');
    if (itens.style.display === 'block' || itens.style.display === '') {
        itens.style.display = 'none';
    } else {
        itens.style.display = 'block';
    }
}