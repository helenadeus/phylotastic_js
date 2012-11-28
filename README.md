phylotastic_js
==============

A javascript controller for the phylotastic workflow.

To execute the controller, download node.js from http://nodejs.org/. Once the service is installed, download the unzip the phylotastic controller. 
To invoke a phylotastic service with default configutation, simply execute the following in a command line (provided you are inside the directory where the phylotastic controller has been unzipped):

>> node server.js

This will invoke the default service “controller.user.call_tree_branch_length(['homo sapiens', 'mus musculus'])”, where the tree_branch_length service is being invoked with “homo sapiens” and “mus musculus” as input. You can also uncomment some of the other service invocations in the server.js folder. To change the location where the phylotastic services can be invoked, simply open model/model.js and change to the appropriate URLs. 