#Mock API (NodeJS)!

## Background
	
Over the past several years I have made a series of 'one off' API services intended to serve mock data to requests. I finally decided to consolidate these into a project, and share with the community.

* Serve realistic sets of data
* Provide pagination
* Support for generating binary data such as PDFs and Images
* Emulate delays in responses 
* Produce very large files which require streaming approaches to consume

## API Endpoints

For most API endpoints, an URL parameter may be provided to 'force' as delay in the response time. This allows the consumer (namely Javascript clients) to handle long running operations. Values are given in seconds, or a string value of 'random' may be provided to varying times (Resulting in a 3 to 90 seccond delay). For example, given the following calls:
	
	/mock/customer?delay=10
	/mock/pdf/pdf_one?delay=90

This first call would ultimately return after 10 seconds, and the in the second call a delay of a minute and a half would be imposed.

###Customer data

Upon API initialization, a large dataset of customers is created and stored server side in memory. Th eidea here is to present a set of data that will required pagination for requests.

####Listing customers (HTTP GET)
Presents a list of customers. By default, pagination is applied.

*/mock/cutomers*

#### Creating a customer (HTTP POST)
*/mock/cutomer

####Creating/updating customers (HTTP PUT)
*/mock/customer

The id parameter present in the payload must match an existing record.

###State/Regional data
/mock/states

###PDF documents
Support for requesting PDF documents is provided. Methods exist for requesting documents by specific names, and by artifical names. In the first case, we may make requests that allow us to test client side caching, and in the second we support the ability to 

Downloading a PDF file
/mock/pdf



###Images
Support for image data is provided. 

Downloading an image
/mock/image/

Downloding random image thumbnails
/mock/image/thumbnail

###Large binary files.


##Starting the application
npm run start