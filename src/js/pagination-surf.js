console.log("pagination surf")
const refs = {
    toLeftEl:document.querySelector('.pagination_left'),
    toRightEl: document.querySelector('.pagination_right'),    
    toFirstEl: document.querySelector('.pagination_first'),
    toEndEl:document.querySelector('.pagination_end'),    
}


let ourArray1 = [
    {move: '1name1'},{move: '1name2'},
    {move: '1name3'},{move: '1name4'},
    {move: '1name5'},{move: '1name6'},
    {move: '1name7'},{move: '1name8'},
    {move: '1name9'},{move: '1name10'},
    // {move: '1name11'},{move: '1name12'},
    // {move: '1name13'},{move: '1name14'},
    // {move: '1name15'},{move: '1name16'},
    // {move: '1name17'},{move: '1name18'},
    // {move: '1name19'},{move: '1name20'},
    // {move: '1name21'},{move: '1name22'},
    // {move: '1name23'},{move: '1name24'},
    // { move: '1name25' }, { move: '1name26' },
    // {move: '1name27'},{move: '1name28'},
]; // массив, какой получаем от API
let ourArray2 = [
    {move: '2name1'},{move: '2name2'},
    {move: '2name3'},{move: '2name4'},
    {move: '2name5'},{move: '2name6'},
    {move: '2name7'},{move: '2name8'},
    {move: '2name9'},{move: '2name10'},
];

// const gallery = document.querySelector('#gallery');//куда рендерим картинки
// const pagination = document.querySelector('.pagination_container');
// console.log(pagination)
// console.log(document.querySelector('.pagination_container'))
// let countOfItems = total.pages; //количество страниц  total.pages от API
// // let countOfItems = 1000;

// let items = [];
// for (let i = 1; i <= countOfItems; i++) {
// 	let li = document.createElement('li');
// 	li.innerHTML = i;
// 	pagination.appendChild(li);
// 	items.push(li);
// }

// showPage(items[0]);

// for (let item of items) {
// 	item.addEventListener('click', function() {
// 		showPage(this);
// 	});
// }

// let showPage = (function() {
// 	let active = null;
// 	// item  это pages
// 	return function(item) {
// 		if (active) {
// 			active.classList.remove('current');
// 		}
// 		active = item;
		
// 		item.classList.add('current');
		
// 		let pageNum = +item.innerHTML;
		
// 		let start = (pageNum - 1) * notesOnPage;
// 		let end = start + notesOnPage;
		
// 		let notes = users.slice(start, end);
		
// 		gallery.innerHTML = '';
// 		for (let note of notes) {
// 			let tr = document.createElement('tr');
// 			gallery.appendChild(tr);
			
// 			createCell(note.name, tr);
// 			createCell(note.surname, tr);
// 			createCell(note.age, tr);
// 		}
// 	};
// }());

// 44444444444444444444444444444444444444444444444444444

// let items = [];
// for (let i = 1; i <= countOfItems; i++) {
// 	let li = document.createElement('li');
// 	li.innerHTML = i;
// 	pagination.appendChild(li);
// 	items.push(li);
// }

// showPage(items[0]);

// for (let item of items) {
// 	item.addEventListener('click', function() {
// 		showPage(this);
// 	});
// }

function createCell(text, tr) {
	let td = document.createElement('td');
	td.innerHTML = text;
	tr.appendChild(td);
}