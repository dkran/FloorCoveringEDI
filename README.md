###Mohawk EDI Syncing / Parsing
---
#Syncing
This program is to download the daily EDI files from the Mohawk Industries EDI server.
that do not exist in the local folder, and downloads them for now.
---
#Processing
Since I've felt unable to find a good ANSI X12 EDI parser, I've opted to try to decode these on my own.
If anyone has any insight into this stuff I'm willing to listen, otherwise watch and see what happens.
Maybe I'll be successful.  
---
#Databases
I've also had a plan to store all this in RethinkDB, but first, I want to get the basics down.  A Database
Would help me match packing slips to invoices, etc.  I'm hoping at some point this could be a microservice.  
----

This project is also usable as an FTP Downloading program to some extent, since it merely grabs files.  I'll soon 
modify the code to do both uploads and downloads, as well as actual date checking not just filename checking.  
I have my own priorities obviously.  