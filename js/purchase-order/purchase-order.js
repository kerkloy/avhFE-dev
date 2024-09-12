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
                        prodName: purchaseOrders.prodName,
                        prodBrand: purchaseOrders.prodBrand,
                        prodType: purchaseOrders.prodType,
                        qtySold: purchaseOrders.qtySold,
                        totalSales: purchaseOrders.totalSales,
                        custName: purchaseOrders.custName,
                        status: purchaseOrders.status,
                        action: `
                            <button class="btn btn-primary btn-sm btnEdit" data-id="${purchaseOrders.transNo}"><svg class="icon-16" width="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">                                    <path d="M13.7476 20.4428H21.0002" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.78 3.79479C13.5557 2.86779 14.95 2.73186 15.8962 3.49173C15.9485 3.53296 17.6295 4.83879 17.6295 4.83879C18.669 5.46719 18.992 6.80311 18.3494 7.82259C18.3153 7.87718 8.81195 19.7645 8.81195 19.7645C8.49578 20.1589 8.01583 20.3918 7.50291 20.3973L3.86353 20.443L3.04353 16.9723C2.92866 16.4843 3.04353 15.9718 3.3597 15.5773L12.78 3.79479Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                    <path d="M11.021 6.00098L16.4732 10.1881" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>  </button>
                            <button class="btn btn-danger btn-sm btnDelete" data-id="${purchaseOrders.id}"><svg class="icon-16" width="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">                                    <path d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                    <path d="M20.708 6.23975H3.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                    <path d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                </svg> </button>
                        `
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
            {data: 'prodName', title: 'Product Name'},
            {data: 'prodBrand', title: 'Brand'},
            {data: 'prodType', title: 'Type'},
            {data: 'qtySold', title: 'Quantity Sold'},
            {data: 'totalSales', title: 'Total Sales'},
            {data: 'custName', title: 'Customer'},
            {data: 'status', title: 'Status'},
            {data: 'action', title: 'Action'}
        ]
    });
});