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
            const response = await fetch("../data/original_data.json");
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
});
