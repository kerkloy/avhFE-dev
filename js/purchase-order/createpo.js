let items = []; let index = 0;
var id;
$(document).ready(function() {
    var totalall = 0;
    
    
    var token = localStorage.getItem('authToken');
            if (!token) {
                window.location.href = '404.html';
                return;
            }

    item_table();
    $('#product_name').select2({
        tags: false,
        placeholder: 'Select a Product',
        ajax: {
            url: 'http://localhost/avhAPI-dev/public/api/getproduct',
            type:'GET',
            headers: {'Authorization' : 'Bearer '+ token,
                    'Accept'  : 'application/json'},
            dataType: 'json',
            delay: 250,
            processResults: function (data) {
                return {
                    results: $.map(data, function (item) {
                        return {
                            id: item.id, 
                            text: item.prodName,
                            prodBrand: item.prodBrand, 
                            prodType: item.prodType,
                            prodSPrice: item.prodSPrice,
                            prodOPrice: item.prodOPrice
                        };
                    })
                };
            },
            cache: true,
            search: true,
        }
    }).on('select2:select', function(e) {
        // let selected = e.params.data.id;
        let oprice = e.params.data.prodOPrice;
        let sprice = e.params.data.prodSPrice;
        $('#prod_brand').val(e.params.data.prodBrand);
        $('#prod_type').val(e.params.data.prodType);
        $('#id').val(e.params.data.id);
        $('#prodOPrice').val(oprice);
        $('#prodSPrice').val(sprice);
        // $('#totalPrice').val(e.params)
        
    });

    $('#qty_sold').on('input', function(){
        let sprice = $('#prodSPrice').val();
        let qty = $('#qty_sold').val();
        let total = sprice * qty;

        $('#totalPrice').val(total);
    })

    $('#customer_name').select2({
        tags: false,
        placeholder: 'Select a Customer',
        ajax: {
            url: 'http://localhost/avhAPI-dev/public/api/getcustomer',
            type:'GET',
            headers: {'Authorization' : 'Bearer '+ token,
                    'Accept'  : 'application/json'},
            dataType: 'json',
            delay: 250,
            processResults: function (data) {
                return {
                    results: $.map(data, function (item) {
                        return {
                            id: item.id, 
                            text: item.custName
                        };
                    })
                };
            },
            cache: true,
        }
    });
    $('#MOP').select2({
        tags: false,
        placeholder: 'Select a Mode of Payment',
        data: [
            { id: 'CASH', text: 'CASH' },
            { id: 'GCASH', text: 'GCASH' },
            { id: 'PAYMAYA', text: 'PAYMAYA' },
            { id: 'BANKTRANSFER', text: 'BANKTRANSFER' }
        ]
    });

    // var arr = $('#tableBodyItems').data('data');
    // if (arr != ''){
    //     arr.forEach(value => {
    //         items.push({
    //             index: index,
    //             prodID: value.prodID,
    //             prodName: value.prodName,
    //             prodBrand: value.prodBrand,
    //             prodType: value.prodType,
    //             qtySold: value.qtySold,
    //             prodOPrice: value.prodOPrice,
    //             prodSPrice: value.prodSPrice,
    //             totalPrice: value.totalPrice,
    //             status: value.status,
    //             action: `<button class="btn btn-primary btn-sm btnEdit" data-id="${value.id}"><svg class="icon-16" width="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">                                    <path d="M13.7476 20.4428H21.0002" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.78 3.79479C13.5557 2.86779 14.95 2.73186 15.8962 3.49173C15.9485 3.53296 17.6295 4.83879 17.6295 4.83879C18.669 5.46719 18.992 6.80311 18.3494 7.82259C18.3153 7.87718 8.81195 19.7645 8.81195 19.7645C8.49578 20.1589 8.01583 20.3918 7.50291 20.3973L3.86353 20.443L3.04353 16.9723C2.92866 16.4843 3.04353 15.9718 3.3597 15.5773L12.78 3.79479Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                    <path d="M11.021 6.00098L16.4732 10.1881" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>  </button>
    //                         <button class="btn btn-danger btn-sm btnDelete" data-id="${value.id}"><svg class="icon-16" width="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">                                    <path d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                    <path d="M20.708 6.23975H3.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                    <path d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                </svg> </button>`
    //         });
    //         index++;
    //     })
    // }
    // item_table();

    // $('#addProduct').on('click', function(){
    //     let prodID = $('#product_name').find(':selected').val();
    //     let prodName = $('#product_name').find(':selected').text();
    //     let prodBrand = $('#prod_brand').val();
    //     let prodType = $('#prod_type').val();
    //     let qtySold = $('#qty_sold').val();
    //     let prodOPrice = $('#prodOPrice').val();
    //     let prodSPrice = $('#prodSPrice').val();
    //     let totalPrice = parseFloat($('#totalPrice').val());
    //     let status = $('#status').val();
    //     let action = `<button class="btn btn-primary btn-sm btnEdit" data-id="${index}">
    //         <i class="fas fa-edit"></i>
    //     </button>
    //     <button class="btn btn-danger btn-sm btnDelete" data-id="${index}">
    //         <i class="fas fa-trash-alt"></i>
    //     </button>`;
    
    //     if(!prodID || !prodName || !prodBrand || !prodType || !qtySold || !prodOPrice || !prodSPrice || !totalPrice || !status) {
    //         $("#errorMsg").html('<div class="alert alert-warning py-2 px-3"><i class="icon fa fa-warning"></i>&nbsp; Incomplete Fields. Please fill out all fields.<button type="button" class="close mt-n1" data-dismiss="alert"><small>&times;</small></button></div>');
    //     } else {
    //         $("#errorMsg").empty();
    
    //         if ($('#addProduct').text() == "Save") {
    //             // Find the index of the item to be updated
    //             const itemIndex = items.findIndex((item) => item.index == id);
    
    //             if (itemIndex > -1) {
    //                 // Recalculate totalall by subtracting the old item's total price
    //                 totalall -= items[itemIndex].t;
    
    //                 // Update the existing item in the array
    //                 items[itemIndex].qtySold = $('#qty_sold').val();
    //                 items[itemIndex].totalPrice = $('#totalPrice').val();
    //                 items[itemIndex].prodID = prodID;
    //                 items[itemIndex].prodName = prodName;
    //                 items[itemIndex].prodBrand = prodBrand;
    //                 items[itemIndex].prodType = prodType;
    //                 items[itemIndex].prodOPrice = prodOPrice;
    //                 items[itemIndex].prodSPrice = prodSPrice;
    //                 items[itemIndex].status = status;
    //                 items[itemIndex].action = action;
    //                 items[itemIndex].t = parseFloat(totalPrice);
    
    //                 // Recalculate totalall by adding the updated item's total price
    //                 totalall += items[itemIndex].t;
    //             }
    
    //         } else {
    //             // Add new item if not in edit mode
    //             items.push({
    //                 index: index,
    //                 t : parseFloat(totalPrice),
    //                 qtySold : $('#qty_sold').val(),
    //                 totalPrice : $('#totalPrice').val(),
    //                 prodID, 
    //                 prodName, 
    //                 prodBrand, 
    //                 prodType, 
    //                 prodOPrice, 
    //                 prodSPrice, 
    //                 status, 
    //                 action
    //             });
    //             index++;
    
    //             // Add the new item's total price to totalall
    //             totalall += parseFloat(totalPrice);
    //         }
    
    //         $('#addProductModal').modal('hide');
    
    //         // Update totalSales display
    //         $('#totalSales').text('₱ '+formatNumber(totalall));
    //         item_table();
    
    //         $('#tableItems').data('data', items);
    //     }
    // });

    $('#addProduct').on('click', function() {
        let prodID = $('#product_name').val();
        let prodName = $('#product_name').find(':selected').text();
        let prodBrand = $('#prod_brand').val();
        let prodType = $('#prod_type').val();
        let qtySold = $('#qty_sold').val();
        let prodOPrice = $('#prodOPrice').val();
        let prodSPrice = $('#prodSPrice').val();
        let total_price = parseFloat($('#totalPrice').val());
        let status = $('#status').val();
        let action = `<button class="btn btn-primary btn-sm btnEdit" data-id="${index}">
            <i class="fas fa-edit"></i>
        </button>
        <button class="btn btn-danger btn-sm btnDelete" data-id="${index}">
            <i class="fas fa-trash-alt"></i>
        </button>`;
    
        if (!prodID || !prodName || !prodBrand || !prodType || !qtySold || !prodOPrice || !prodSPrice || !total_price || !status) {
            $("#errorMsg").html('<div class="alert alert-warning py-2 px-3"><i class="icon fa fa-warning"></i>&nbsp; Incomplete Fields. Please fill out all fields.<button type="button" class="close mt-n1" data-dismiss="alert"><small>&times;</small></button></div>');
        } else {
            $("#errorMsg").empty();
    
            if ($(this).hasClass('btnUpdate')) {
                // Use the global `id` to find the item
                const itemIndex = items.findIndex(item => item.index == id);
    
                if (itemIndex > -1) {
                    // Subtract the old total from totalall
                    totalall -= items[itemIndex].t;
    
                    // Update the item in the array
                    items[itemIndex].qtySold = parseFloat(qtySold);
                    items[itemIndex].total_price = parseFloat(total_price);
                    items[itemIndex].prodID = prodID;
                    items[itemIndex].prodName = prodName;
                    items[itemIndex].prodBrand = prodBrand;
                    items[itemIndex].prodType = prodType;
                    items[itemIndex].prodOPrice = parseFloat(prodOPrice);
                    items[itemIndex].prodSPrice = parseFloat(prodSPrice);
                    items[itemIndex].status = status;
                    items[itemIndex].t = parseFloat(total_price);
                    // items[itemIndex].action = action;

                    // $('#btnEdit').data('id', items[itemIndex].id);
                    // Add the new total back to totalall
                    totalall += items[itemIndex].t;


                }
    
                // Reset `id` and update button state after saving
                id = 0;
                $('#addProduct').text('Add Product');
                $('#addProduct').removeClass('btnUpdate');
                $('#addProduct').addClass('addProduct');
            } else {
                // If not updating, add a new item as usual
                items.push({
                    index: index,
                    t: parseFloat(total_price),
                    qtySold: parseFloat(qtySold),
                    total_price: parseFloat(total_price),
                    prodOPrice: parseFloat(prodOPrice),
                    prodSPrice: parseFloat(prodSPrice),
                    prodID, 
                    prodName, 
                    prodBrand, 
                    prodType,
                    status, 
                    action
                });
                index++;
    
                // Add the total price of the new item to totalall
                totalall += parseFloat(total_price);
            }
    
            // Hide the modal and update total sales display
            $('#addProductModal').modal('hide');
            $('#totalSales').text(parseFloat(totalall));
            $('#totalSales').val(parseFloat(totalall));
    
            // Update the item table with the modified data
            item_table();
            $('#tableItems').data('data', items);
        }
    });
    
    

    $('#btnAdd').on('click', function(){
            
        $('#addProduct').text('Add');
        $('#addProduct').removeClass('btnUpdate');
        $('#addProduct').addClass('addProduct');

        $('#id').val('');
        $('#product_name').empty();
        $('#prod_brand').val('');
        $('#prod_type').val('');
        $('#qty_sold').val('');
        $('#prodOPrice').val('');
        $('#prodSPrice').val('');
        $('#totalPrice').val('');
    });
    // $('#tableItems').on('click','.btnEdit' ,function(){
    //     id = $(this).data('id');
    //     $('#addProductModal').modal('show');
    //     const found = items.find((item) => item.index == $(this).data('id'));
    //     var index = $(this).data('index');
    //     $('#id').val(found.prodID);
    //     $('#product_name').text(found.productName);
    //     $('#product_name').val(found.prodID);
    //     $('#prod_brand').val(found.prodBrand);
    //     $('#prod_type').val(found.prodType);
    //     $('#qty_sold').val(found.qtySold);
    //     $('#prodOPrice').val(found.prodOPrice);
    //     $('#prodSPrice').val(found.prodSPrice);
    //     $('#totalPrice').val(found.totalPrice);
    //     $('#selectedItemRowId').val(index);
    //     $('#editProductModal').modal('show');

    //     $('#addProduct').text('Save');
    //     $('#addProduct').addClass('btnUpdate');
    //     $('#addProduct').removeClass('addProduct');
    // });

    $('#tableItems').on('click', '.btnEdit', function() {
        // Capture the correct item id (index) when editing
        id = $(this).data('id');
        // return alert(id);

        $('#id').val('');
        $('#product_name').empty();
        $('#prod_brand').val('');
        $('#prod_type').val('');
        $('#qty_sold').val('');
        $('#prodOPrice').val('');
        $('#prodSPrice').val('');
        $('#totalPrice').val('');
        
        // Find the item to be edited
        const found = items.find(item => item.index == id); 
    
        if (found) {
            // Populate the modal with the existing data
            $('#product_name').val(found.prodID).trigger('change');  // Set the prodID and trigger change event
    
            // Set the text inside the select2 to prodName if it's not already present
            let newOption = new Option(found.prodName, found.prodID, true, true); 
            $('#product_name').append(newOption).trigger('change');
            $('#prod_brand').val(found.prodBrand);
            $('#prod_type').val(found.prodType);
            $('#qty_sold').val(found.qtySold);
            $('#prodOPrice').val(found.prodOPrice);
            $('#prodSPrice').val(found.prodSPrice);
            $('#totalPrice').val(found.total_price);
            $('#status').val(found.status);
    
            // Set the button text to indicate update mode
            $('#addProductModalLabel').text('Update Product');
            $('#addProduct').text('Save');
            $('#addProduct').addClass('btnUpdate');
            $('#addProduct').removeClass('addProduct');
    
            // Show the modal
            $('#addProductModal').modal('show');
        }
    });

    $('#btnBack').on('click', function(){
        window.history.back();
    });

    $('#tableItems').on('click','.btnDelete', function(){
        // Assuming `this` refers to the clicked btnDelete
    const itemIndex = $(this).data('id'); // Get the data-id, which is the index

    if (itemIndex > -1) {
        // Subtract the total of the item from totalall before deleting
        totalall -= items[itemIndex].t;
        
        // Remove the item from the items array
        items.splice(itemIndex, 1);
        
        // Optionally, update the UI to reflect the deletion
        $(this).closest('tr').remove(); // Assuming you're removing a table row
        
        $('#totalSales').text(parseFloat(totalall));
        $('#totalSales').val(parseFloat(totalall));
    }

    });

    $('#btnSavePO').on('click', function() {
        let custName = $('#customer_name').text();
        let purchaseDate = $('#purchase_date').val();
        let totalSales = $('#totalSales').text();
        let MOP = $('#MOP').val();

        let formData = {
            custName: custName,
            purchaseDate: purchaseDate,
            totalSales: parseFloat(totalSales),
            MOP: MOP,
            items: items,
        };

        console.log(formData);

        swal({
            title: "Confirm",
            text: "Are you sure you want to save the items?",
            icon: "warning",
            buttons: ["Cancel", "Save"],
            dangerMode: false,
        })
        .then((willSave) => {
            if (willSave) {
                axios.post('http://localhost/avhAPI-dev/public/api/purchaseOrder', formData, {
                    headers: {
                        'Authorization' : 'Bearer '+ token,
                        'Accept'  : 'application/json'
                    }
                })
                .then(function(response) {
                    console.log(response);
                    var data = response.data;
    
                    if (data.hasOwnProperty('error')) {
                        // If the response contains an error message, display it
                        swal({
                            title: "Error!",
                            text: data.error,
                            icon: "error",
                            button: "OK",
                        });
                    } else {
                        // Otherwise, display success message
                        swal({
                            title: "Purchase Successful",
                            text: "The Purchase Order was created successfully. Refer to " + data.transNo,
                            icon: "success",
                            button: "OK",
                        })                        
                        .then((okClicked) => {
                            if (okClicked) {
                                window.history.back();
                            }
                        });
                    }
                })
                .catch(function(error) {
                    console.log(error);
                    swal({
                        title: "Error",
                        text: "An error occurred while processing your request.",
                        icon: "error",
                        button: "OK",
                    });
                });
            }
        });
    })

    window.onload = function() {
        // Parse URL parameters
        var urlParams = new URLSearchParams(window.location.search);
        
        // Get the transNo and set it to the element with id 'transNo'
        var transNo = urlParams.get('transNo');
        if (transNo) {
            document.getElementById('transNo').textContent = transNo;
        }
    };    
    
});

function item_table() {
    console.log(items)
    $('#tableItems').DataTable().destroy();
    var itemTable = $('#tableItems').DataTable({
        "info": false,
        "paging": false,
        "data": items,
        "order": [],
        lengthMenu: [
            [10, 25, 50, -1],
            [10, 25, 50, 'All']
        ],
        "columns": [
            {data:'prodID', title:'ID'},
            {data: 'prodName', title:'Product Name'},
            {data: 'prodBrand', title:'Brand'},
            {data: 'prodType', title:'Type'},
            {data: 'qtySold', title:'Qty Sold'},
            {data: 'prodSPrice', title:'Price'},
            {data: 'total_price', title:'Total Price'},
            {data: 'status', title:'Status'},
            {data: 'action', title:'Action'},
        ]
    })
}

