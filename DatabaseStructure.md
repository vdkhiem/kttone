Company (ID, Code, Name) // Phase 2
Supplier (ID, Code, Name) // Phase 2

Inventory (ID, ProductID, Quantity, QuantityOut, ExpiryDate, IsReturnedProduct)
Order (ID, Code, OrderDate, PayDate, CustomerID, AmountPaid, Discount, Comment)
OrderDetail (ID, OrderID, ProductId, InventoryID, Quantity)

SystemSetup(ID, Code, Value) // Define system lookup value. E.g. default bank account
Customer (ID, Name, Email, Phone, ShipAddress, ShipPostalCode, ShipState, ShipCity, BillAddress, BillPostalCode, BillState, BillCity)
Product (ID, Code, Description, Unit, IsGST, GST)
Invoice (ID, Code, CustomerID, InvoiceDate, DueDate, Status)
InvoiceDetail (ID, InvoiceID, ProductID, Quantity)
