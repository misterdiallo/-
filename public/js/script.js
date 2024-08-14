document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector("#tbody");
    const paginationContainer = document.querySelector("#pagination-container");
    const fileInput = document.querySelector("#fileInput");
    const rowsPerPageSelect = document.querySelector("#rowsPerPage");

    let data = []; // To store the original data
    let filteredData = []; // To store the filtered data
    let currentPage = 1; // Current page number
    let rowsPerPage = parseInt(rowsPerPageSelect.value); // Initial rows per page value
    let initialData = [];

    const fetchData = async () => {
        try {
            const response = await fetch("../data/源数据.json");
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            data = await response.json();
            filteredData = data; // Initially filtered data is the same as the original data
            initialData = data; // Initially filtered data is the same as the original data
            renderTable(filteredData);
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    };

    const displayField = (fieldName) => {
        return fieldName !== undefined ? fieldName : "&nbsp;";
    };

    // Function to render table based on selected rows per page
    const renderTable = () => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        const paginatedData = filteredData.slice(startIndex, endIndex);

        tableBody.innerHTML = "";

        paginatedData.forEach((entry) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${displayField(entry["序号"])} </td>
                <td>${displayField(entry["学院"])}</td>
                <td>${displayField(entry["工号"])}</td>
                <td>${displayField(entry["姓名"])}</td>
                <td>${displayField(entry["考核分数"])}</td>
                <td>${displayField(entry["名次"])}</td>
                <td>${displayField(entry["评价等次"])}</td>
                <td>${displayField(entry["学期"])}</td>
                <td>${displayField(entry["备注"])}</td>
                <td>${displayField(entry["说明"])}</td>
            `;
            tableBody.appendChild(row);
        });

        renderPagination(filteredData.length);
    };

    const renderPagination = (dataLength) => {
        const pageCount = Math.ceil(dataLength / rowsPerPage);

        paginationContainer.innerHTML = ""; // Clear previous pagination buttons

        const createPaginationButton = (text, pageNumber, active = false) => {
            const button = document.createElement("button");
            button.textContent = text;
            button.classList.add("btn", "mx-1", "btn-sm");
            if (active) {
                button.classList.add("btn-primary");
                button.disabled = true; // Disable the active button
            } else {
                button.classList.add("btn-secondary");
                button.onclick = () => {
                    currentPage = pageNumber;
                    renderTable(filteredData);
                };
            }
            paginationContainer.appendChild(button);
        };

        // "Prev" button
        if (currentPage > 1) {
            createPaginationButton("上一页", currentPage - 1);
        }

        // First page
        createPaginationButton("1", 1, currentPage === 1);

        // Middle pages
        let startPage = Math.max(2, currentPage - 2);
        let endPage = Math.min(pageCount - 1, currentPage + 2);
        if (startPage > 2) {
            createPaginationButton("...", startPage - 1, false);
        }
        for (let i = startPage; i <= endPage; i++) {
            createPaginationButton(i.toString(), i, currentPage === i);
        }
        if (endPage < pageCount - 1) {
            createPaginationButton("...", endPage + 1, false);
        }

        // Last page
        if (pageCount > 1) {
            createPaginationButton(
                pageCount.toString(),
                pageCount,
                currentPage === pageCount
            );
        }

        // "Next" button
        if (currentPage < pageCount) {
            createPaginationButton("下一页", currentPage + 1);
        }
    };
    // Event listener for rows per page selection change
    rowsPerPageSelect.addEventListener("change", function () {
        rowsPerPage = parseInt(this.value); // Update rowsPerPage value
        currentPage = 1; // Reset currentPage to 1
        renderTable(); // Re-render the table with updated rows per page
    });

    const filterData = (excelData) => {
        const excel工号Set = new Set(excelData.slice(1).map((row) => row[1])); // Create a set of 工号 from Excel data
        filteredData = data.filter((row) =>
            excel工号Set.has(parseInt(row["工号"]))
        ); // Filter data based on 工号
        renderTable(filteredData);
    };

    fileInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0]; // Assuming first sheet
            const worksheet = workbook.Sheets[sheetName];
            const excelData = XLSX.utils.sheet_to_json(worksheet, {
                header: 1,
            });
            filterData(excelData);
        };
        var removeFile = document.getElementById("removeFile");

        if (fileInput.files.length > 0) {
            removeFile.style.display = "block";
        } else {
            removeFile.style.display = "none";
        }

        reader.readAsArrayBuffer(file);
    });
    document
        .getElementById("removeFile")
        .addEventListener("click", function () {
            var fileInput = document.getElementById("fileInput");
            var removeFile = document.getElementById("removeFile");

            fileInput.value = ""; // Clear the file selection
            removeFile.style.display = "none"; // Hide the remove button
            renderTable(initialData);
        });

    fetchData().catch((error) => console.error("Error:", error));















    // Get modal element
    var modal = document.getElementById("myModal");
    // Get button element that opens the modal
    var btn = document.getElementById("openModalBtn");
    // Get <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    // Get file input element
    var fileInputNew = document.getElementById("fileInput");
    // Get excel data div element
    var excelData = document.getElementById("excelData");
    // Get save button element
    var saveBtn = document.getElementById("saveBtn");

    var workbook; // Store the workbook globally to access it for saving

    // When the user clicks the button, open the modal
    btn.onclick = function () {
        modal.style.display = "block";
        document.body.classList.add("modal-open"); // Disable body scrolling
    }

    // Function to close modal and refresh the page
    function closeModal() {
        modal.style.display = "none";
        excelData.innerHTML = ""; // Clear the data when modal is closed
        document.body.classList.remove("modal-open"); // Enable body scrolling
        // location.reload(); // Refresh the page
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        closeModal();
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            closeModal();
        }
    }

    // Handle file input change event
    fileInput.onchange = function (event) {
        var file = event.target.files[0];
        var reader = new FileReader();

        reader.onload = function (e) {
            var data = new Uint8Array(e.target.result);
            workbook = XLSX.read(data, { type: 'array' }); // Store the workbook

            var firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            var excelHtml = XLSX.utils.sheet_to_html(firstSheet, {
                // header: "<thead><tr><th>Header 1</th><th>Header 2</th><th>Header 3</th></tr></thead>", // Optional custom header
                id: "excelTable", // ID for the table
                editable: true // Allow editing
            });

            excelData.innerHTML = excelHtml;

            // Show the Save button now that data is loaded
            saveBtn.style.display = "block";

            // Add styles to the generated table
            var table = document.getElementById("excelTable");
            table.style.width = "100%";
            table.style.borderCollapse = "collapse";

            // Apply borders to table cells
            var cells = table.getElementsByTagName("td");
            for (var i = 0; i < cells.length; i++) {
                cells[i].style.border = "1px solid #ddd";
                cells[i].style.padding = "8px";
            }

            var headers = table.getElementsByTagName("th");
            for (var j = 0; j < headers.length; j++) {
                headers[j].style.border = "1px solid #ddd";
                headers[j].style.padding = "8px";
                headers[j].style.backgroundColor = "#f2f2f2";
                headers[j].style.textAlign = "left";
            }
        };

        reader.readAsArrayBuffer(file);
    }

    // Handle Save button click event
    saveBtn.onclick = async function () {
        // Get the new data from the modal (which is currently filteredData)
        var newData = initialData.map(entry => [
            entry["序号"],
            entry["学院"],
            entry["工号"],
            entry["姓名"],
            entry["考核分数"],
            entry["名次"],
            entry["评价等次"],
            entry["学期"],
            entry["备注"],
            entry["说明"]
        ]);

        // Get the existing data from the workbook (first sheet)
        var firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        var existingData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

        // Append the new data to the existing data
        existingData = existingData.concat(newData);  // Append new data to existing

        // Convert the combined data back to a worksheet
        var newSheet = XLSX.utils.aoa_to_sheet(existingData);

        // Replace the existing sheet with the combined one
        workbook.Sheets[workbook.SheetNames[0]] = newSheet;

        // Generate a new Excel file
        var newWorkbookData = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

        // Create a Blob and trigger a download
        var blob = new Blob([newWorkbookData], { type: "application/octet-stream" });
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "新+旧数据.xlsx"; // Name the new file
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);



        // Convert workbook to JSON
        var jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 });

        // Remove the header row (first row) from jsonData
        jsonData.shift();
        // Append the new data to the existing data
        jsonData = jsonData.concat(newData);  // Append new data to existing


        // Update the filteredData and render the table with the combined data
        filteredData = jsonData.map(row => ({
            "序号": row[0],
            "学院": row[1],
            "工号": row[2],
            "姓名": row[3],
            "考核分数": row[4],
            "名次": row[5],
            "评价等次": row[6],
            "学期": row[7],
            "备注": row[8],
            "说明": row[9],
        }));
        // Send new data to server
        try {
            const response = await fetch('/update-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(filteredData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const message = await response.text();
            console.log(message);
            renderTable(filteredData);  // Re-render the table with the new combined data

        } catch (error) {
            console.error('Error:', error);
        }
    }


    // const searchInput = document.getElementById("searchInput");

    // searchInput.addEventListener("input", function () {
    //     const query = searchInput.value.toLowerCase();
    //     filteredData = data.filter((row) => {
    //         return (
    //             (row["序号"] ? row["序号"].toString().toLowerCase() : "").includes(query) ||
    //             (row["学院"] ? row["学院"].toLowerCase() : "").includes(query) ||
    //             (row["工号"] ? row["工号"].toString().toLowerCase() : "").includes(query) ||
    //             (row["姓名"] ? row["姓名"].toLowerCase() : "").includes(query) ||
    //             (row["考核分数"] ? row["考核分数"].toString().toLowerCase() : "").includes(query) ||
    //             (row["名次"] ? row["名次"].toString().toLowerCase() : "").includes(query) ||
    //             (row["评价等次"] ? row["评价等次"].toLowerCase() : "").includes(query) ||
    //             (row["学期"] ? row["学期"].toLowerCase() : "").includes(query) ||
    //             (row["备注"] ? row["备注"].toLowerCase() : "").includes(query) ||
    //             (row["说明"] ? row["说明"].toLowerCase() : "").includes(query)
    //         );
    //     });
    //     currentPage = 1; // Reset to first page after filtering
    //     renderTable(filteredData); // Re-render the table with the filtered data
    // });



    const exporttable = document.getElementById("exporttable");
    exporttable.onclick = function () {
        // Convert JSON to worksheet
        const ws = XLSX.utils.json_to_sheet(filteredData);

        // Create a new workbook and append the worksheet
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

        // Generate a new Excel file
        var newWorkbookData = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

        // Create a Blob and trigger a download
        var blob = new Blob([newWorkbookData], { type: "application/octet-stream" });
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "导出数据.xlsx"; // Name the new file
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);


    }



});

