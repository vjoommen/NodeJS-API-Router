/*require the ibm_db module*/
var ibmdb = require('ibm_db');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

var db2Connection;

console.log("Test program to access DB2 sample database");

/*Connect to the database server
  param 1: The DSN string which has the details of database name to connect to, user id, password, hostname, portnumber 
  param 2: The Callback function to execute when connection attempt to the specified database is completed
*/
ibmdb.open("DRIVER={DB2};DATABASE=OMS94;UID=OMS94;PWD=password;HOSTNAME=localhost;port=50000", function(err, conn)
{
        if(err) {
		/*
		  On error in connection, log the error message on console 
		*/
          	console.error("error: ", err.message);
        } else {

        	db2Connection = conn;

		/*
			On successful connection issue the SQL query by calling the query() function on Database
			param 1: The SQL query to be issued
			param 2: The callback function to execute when the database server responds
		*/
		// conn.query("select * from OMS94.yfs_order_header fetch first 5 rows only", function(err, orders, moreResultSets) {
  //                       console.log("Order No \t\t Enterprise Key");
		// 	console.log("----------\t\t---------");


		// 	/*
		// 		Loop through the employees list returned from the select query and print the First name and last name of the employee	
		// 	*/
  //                       for (var i=0;i<orders.length;i++)
		// 	{
		// 		console.log(orders[i].ORDER_NO, "\t\t", orders[i].ENTERPRISE_KEY);
		// 	}
		// 	console.log("-----------------------");

		// 	/*
		// 		Close the connection to the database
		// 		param 1: The callback function to execute on completion of close function.
		// 	*/
		// 	// conn.close(function(){
		// 	// 	console.log("Connection Closed");
		// 	// });
		// });
	}
});

	

module.exports.getOrderList = function(req, res){

	var orders = [];
	var orderIndex = 0;
	
	var maxRecords = req.query.maxRecords;
	if(maxRecords == undefined){
		maxRecords = 2; // default
	}

	function buildOrders(ordersRes){
		for (var i=0;i<ordersRes.length;i++){
				orderIndex = i;
				orders.push({
					order_no : ordersRes[i].ORDER_NO,
					enterprise_key : ordersRes[i].ENTERPRISE_KEY,
					overal_order_no : combine(ordersRes[i])									
				});				

				orderheaderkey = ordersRes[i].ORDER_HEADER_KEY;
				console.log("Order Header key : "+orderheaderkey);
				buildOrderLines(db2Connection.prepareSync(sql_order_lines).executeSync([orderheaderkey]).fetchAllSync());
		}
		
	};

	function buildOrderLines(orderLinesRes){
			for (var olCount=0;olCount<orderLinesRes.length;olCount++){
				console.log("olCount : "+olCount+" orderIndex:"+orderIndex);
						
						if(olCount == 0){
							orders[orderIndex].order_lines = [];
						}

						orders[orderIndex].order_lines.push({
							item_id : orderLinesRes[olCount].ITEM_ID,
							ordered_qty : orderLinesRes[olCount].ORDERED_QTY,
							order_line_key : orderLinesRes[olCount].ORDER_LINE_KEY
						});
			}
			
	};
	
	var sql = "select * from OMS94.yfs_order_header fetch first "+maxRecords+" rows only";
	var sql_order_lines = " select * from OMS94.yfs_order_line where order_header_key = ? ";

	buildOrders(db2Connection.querySync(sql))
	sendJSONresponse(res, 200, orders);
	
};

function combine(order){
	return order.ORDER_NO+'_'+order.ENTERPRISE_KEY;
};
