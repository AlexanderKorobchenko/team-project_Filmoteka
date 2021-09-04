import paginationTmp from '../templates/paginationTmp.hbs'

function creatPagination() {
    console.log('pagination to start')
    const paginationEl = document.createElement('div');
    paginationEl.className = 'pagination';
    paginationEl.innerHTML = paginationTmp();
    document.querySelector(".main").appendChild(paginationEl);
}

creatPagination()



