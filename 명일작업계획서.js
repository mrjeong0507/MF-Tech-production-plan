const addEntryButton = document.querySelector('.add-entry');
const workEntries = document.getElementById('work-entries');
let entryCount = 1;

addEntryButton.addEventListener('click', () => {
    if (entryCount >= 10) return;

    const entryDiv = document.createElement('div');
    entryDiv.classList.add('work-entry');
    entryDiv.setAttribute('id', `entry-${entryCount}`);
    entryDiv.innerHTML = `
        <h3>작업 항목 ${entryCount + 1}</h3>
        <div class="form-group">
            <label for="work-${entryCount}">작업내용:</label>
            <input type="text" id="work-${entryCount}" name="work[]" placeholder="작업내용을 입력하세요">
        </div>
        <div class="form-group">
            <label for="quantity-${entryCount}">작업수량:</label>
            <input type="number" id="quantity-${entryCount}" name="quantity[]" placeholder="작업수량을 입력하세요">
        </div>
        <div class="form-group">
            <label for="time-${entryCount}">예상작업시간 (분):</label>
            <input type="number" id="time-${entryCount}" name="time[]" placeholder="예상작업시간을 입력하세요">
        </div>
    `;
    workEntries.appendChild(entryDiv);
    entryCount++;
});

document.getElementById('work-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const date = document.getElementById('date').value;
    const process = document.getElementById('process').value;
    const name = document.getElementById('name').value;
    const work = Array.from(document.querySelectorAll('input[name="work[]"]')).map(input => input.value);
    const quantity = Array.from(document.querySelectorAll('input[name="quantity[]"]')).map(input => input.value);
    const time = Array.from(document.querySelectorAll('input[name="time[]"]')).map(input => input.value);

    const data = [
        ['날짜', '공정', '이름', '작업내용', '작업수량', '예상작업시간 (분)']
    ];

    for (let i = 0; i < work.length; i++) {
        data.push([date, process, name, work[i], quantity[i], time[i]]);
    }

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, '생산작업계획서.xlsx');
});
