$(document).ready(function() {
    var token = localStorage.getItem('authToken');
            if (!token) {
                window.location.href = '404.html';
                return;
            }
    var table = $('#dataTable').DataTable({
        processing: true,
        serverSide: false,
        dom: "<'row'<'col-sm-12 col-md-6'B><'col-sm-12 col-md-6'f>>" + // Buttons and filter in one row
         "<'row'<'col-sm-12'tr>>" + // Table rows
         "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>", 
        async: true,
        language        : {
            processing  : '<i class="fa fa-spinner fa-spin fa-3x fa-fw text-secondary"></i><br><span class="sr-only font-weight-bold text-secondary">Loading...</span> ',
            lengthMenu  : 'Display _MENU_ records',
            search      : 'Search ',
            emptyTable  : '<span class="text-secondary font-12px-bold">No available record to show</span>',
        },
        buttons: [
            {
                text:'Reload',
                action:function(e,dt,node,config){
                    $('#dataTable').DataTable().ajax.reload();
                    // $("#show-alert-table").addClass('d-none');
                } 
            },
            {
                text:'New',
                action:function(e,dt,node,config){
                    window.location = ('createpo.html');
                } 
            },
            {
                extend: 'collection',
                text: 'Export',
                buttons: [
                    {
                        extend: 'pdf',
                        exportOptions: {
                            columns: [0,1,2,3,4,5,6,7]
                        }
                    },
                    {
                        extend: 'excel',
                        exportOptions: {
                            columns: [0,1,2,3,4,5,6,7]
                        }
                    },
                    {
                        extend: 'print',
                        exportOptions: {
                            columns: [0,1,2,3,4,5,6,7]
                        }
                    },
                ]
            },
            {
                text:'Cards',
                action:function(e,dt,node,config){
                    
                } 
            },
        ],
        ajax: function(data, callback, settings) {
            axios.get('http://localhost/avhAPI-dev/public/api/polist', {
                headers:{
                    'Authorization' : 'Bearer '+ token,
                    'Accept'  : 'application/json'
                  }
            })
            .then(function(response) {
                console.log(response.data);
                if (!response.data) {
                    console.error("purchaseOrders data is missing");
                    return;
                }
                var purchaseOrders = response.data.map (function(purchaseOrders) {
                    return {
                        transNo: purchaseOrders.transNo,
                        POnum: purchaseOrders.POnum,
                        ORnum: purchaseOrders.ORnum,
                        INVnum: purchaseOrders.INVnum,
                        qtySold: purchaseOrders.qtySold,
                        totalSales: purchaseOrders.totalSales,
                        custName: purchaseOrders.custName,
                        status: purchaseOrders.status,
                        action: `<button class="btn btn-primary btn-sm btnEditPO" data-id="${purchaseOrders.transNo}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-danger btn-sm btnDeletePO" data-id="${purchaseOrders.id}">
                            <i class="fas fa-trash-alt"></i>
                        </button>`
                    };
                });
                callback({
                    data: purchaseOrders
                });
            })
            .catch(function(error) {
                console.error("API error:", error);
            });
        },
        columns: [
            {data: 'transNo', title: 'TransNo'},
            {data: 'POnum', title: 'PO #'},
            {data: 'ORnum', title: 'OR #'},
            {data: 'INVnum', title: 'Invoice #'},
            {data: 'qtySold', title: 'Qty Sold'},
            {data: 'totalSales', title: 'Total Sales'},
            {data: 'custName', title: 'Customer'},
            {data: 'status', title: 'Status'},
            {data: 'action', title: 'Action'}
        ]
    });

    $('#dataTable').on('click', '.btnEditPO', function() {
        var id = $(this).data('id');
        
        axios.get('http://localhost/avhAPI-dev/public/api/purchaseOrder/' + id, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json'
            }
        })
        .then(function(response) {
            console.log(response.data);
            var purchaseOrder = response.data;
            var get =purchaseOrder.data
            get.forEach(element => {
                window.location = ('createpo.html?id=' + id + '&transNo=' + element.transNo);
            });
        })
        .catch(function(error) {
            console.error("API error:", error);
        });
    });
    
});