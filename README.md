###Mohawk EDI Syncing / Parsing
---
#Syncing
This program is to download the daily EDI files from floor covering (or possibly any, untested) EDI servers.
I currently have samples for Mohawk and Shaw servers and processing.

---
#Processing
Since I've felt unable to find a good ANSI X12 EDI parser, I've opted to try to decode these on my own.
If anyone has any insight into this stuff I'm willing to listen, otherwise watch and see what happens.
Maybe I'll be successful.

So far: I can process the 856 Shipping manifests from Mohawk or Shaw fine with this app.  
TODO:

* 810 Invoice
* 832 Sales Catalog
* 997 Functional Acknowledgement

---
#Databases
I've also had a plan to store all this in RethinkDB, but first, I want to get the basics down.  A Database
Would help me match packing slips to invoices, etc.  I'm hoping at some point this could be a microservice.  

#Contributing
If you'd like to contribute and can't decipher the code (sorry for lack of comments) let me know and I
will comment it to make it easier to understand.