## Notes
* Infra team says we should discuss the hosting solution: \
--> It seems they are willing to give us a VPS \
--> Once we decide if we want VPS, we should let the team know so they can provide one for us \
--> Outbound/inbound rules we can disregard, they will deal with that 


## Connect to MongoDB

### Creating an SSH tunnel to the MongoDB (on AWS): \
`ssh -i /path/to/pem.pem ubuntu@ec2-50-18-42-4.us-west-1.compute.amazonaws.com  -Nf -L 27018:localhost:27017` \
--> This will allow you to connect to the remote mongodb by using an local address `27018:localhost:27017` 




## TASKS


### TODO
-> Create private keys for everyone



## AWS 

Host: `ubuntu@ec2-50-18-42-4.us-west-1.compute.amazonaws.com`

1. To ssh into the EC2 instance, you will need private keys to be set up (WIP)




## npm

### Building frontend
Setup: \
`npm install` \
`npm run build` 

Run: \
`npm run start`


