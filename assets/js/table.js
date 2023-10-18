const advancedResponsiveTables = document.querySelectorAll('.has-table-head-responsive')
const sortIcon = document.createElement('span')
sortIcon.classList.add('sort-icon');
sortIcon.textContent = '↕';

advancedResponsiveTables.forEach(function (currentTable, tableIndex) {
  currentTable.querySelectorAll('tbody tr').forEach((currentTr) => {
    currentTr.querySelectorAll('td').forEach((currentTd, index) => {
      currentTd.querySelector('.theading-content').innerHTML = currentTable.querySelectorAll('thead tr th')[index].innerHTML + '<span class="sort-icon">↕️</span>';
      currentTd.querySelector('.theading-content').setAttribute('data-theading-index', index)
    })
  })

  if(currentTable.querySelector('table').classList.contains('table-sort')) {
    currentTable.querySelectorAll('thead tr th').forEach((currentTh, index) => {
      currentTh.appendChild(sortIcon.cloneNode(true))
    })
  }
})