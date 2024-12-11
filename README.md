
![Alt text](images/mock-api.png)

#Mock API (NodeJS)!

## Background
	
Over the past several years I have made a series of 'one off' API services intended to serve mock data to requests. I finally decided to consolidate these into a project, and share with the community.

### Core goals
1. Serve realistic sets of data when appropriate.
2. Provide support for calls that contains and do not contain pagination formatted responses
3.  Support for generating binary data such as PDFs and Images. For PDF operations, we acept an optional argument indicates the desired number of pages.
4. Emulate delays in responses. Often calls to APIs result in calls to other APIs which are driven by systems that are no necessarily performance optimzal.
5. Produce very large files which require streaming approaches to consume. This provides the ability to work with progress indicators. 
6. Force the API to optionally return expiration date related data. This information may or may not be returned depending on the implementation or ability to determine the total file size (i.e. streaming data).

Basically we are creating a playground to serve data for UI development purposes.

## Common functionality
*Mocking delays/increasing the response time*

All calls support the ability to emulate delayed response times, this is usefull when experimenting with progress indicators from a UI perspective.


*Working with cache related header data*

Additionally, all calls support the ability to force the API to respond caching related headers, indicating to the client that there is an expiration date on the data, which provides the ability for the client to cache data according to the expiration date. 

The 'returnLength' HTTP GET parameter is provided will result in the return of the HTTP Header 'Content-length' with the value of the returned file size in bytes. This may be usefull in requests that attempt to track download progress. 

The 'maxAge' HTTP GET parameter will force the API to return the 'Cache-Control: max-age=[requested age]' header, where the value passed as an argument will be returned in the headers, value is passed in seconds. This is usefull in cases where you want to perform caching on the client based on the expiration date of the data.

## API Endpoints

For most API endpoints, an URL parameter may be provided to 'force' as delay in the response time. This allows the consumer (namely Javascript clients) to handle long running operations. Values are given in seconds, or a string value of 'random' may be provided to varying times (Resulting in a 3 to 90 seccond delay). For example, given the following calls:
	
	/mock/customer?delay=10
	/mock/pdf/pdf_one?delay=90

This first call would ultimately return after 10 seconds, and the in the second call a delay of a minute and a half would be imposed.

### Customer data

Upon API initialization, a large dataset of customers is created and stored server side in memory. Th eidea here is to present a set of data that will required pagination for requests.

#### Listing customers (HTTP GET)
Presents a list of customers. By default, pagination is applied.

*/mock/cutomers*

#### Creating a customer

*/mock/customer* (HTTP POST)
This call emulates the ability to perform an create operation. The only required fields for a customer are first and last name. 

Upon successful a response, an HTTP 201 (created) status code is returned. In the event the entity fails validation (i.e. first or last name is not present) then an HTTP 400 (bad request) is returned. Fields which fail the validation step will contain details in the response payload.

*/mock/cutomer

####Creating/updating customers (HTTP PUT)
*/mock/customer*

#### Viewing a customer
*/mock/customer/[id]*

Allows the user to view a customer by unique id. In the event that an invalid customer id is not present (the list operation will provide a collection of valid ids) then an HTTP 404 (not found) code will be returned. Whereas an normal 404 will be returned from non-existant URLs, in this case an HTTP header will be returned additionally allowing the consumer to establish the fact that the requested endpoint *does exist* however the selected resource *doet not exist*, which allows the client to more effectively deal with.


### State/Regional data

`/mock/states`

### PDF documents
Support for requesting PDF documents is provided. Methods exist for requesting documents by specific names, and by artifical names. In the first case, we may make requests that allow us to test client side caching, and in the second we support the ability to 

Listing PDF files

`/mock/pdf`

Provides a list of available PDFs.

Downloading a PDF file

`/mock/pdf/[id]`

By default, an 11 page document will be provided. If a value for the get parameter 'length' is provided, then a document will be returned with the specified length.

### Images
Support for image data is provided. 

Downloading an image
/mock/image/

Downloding random image thumbnails
/mock/image/thumbnail

### Large binary files.
Provides the ability to emulate large file downloads. File by default are empty binary streams, with an estimated size of 50MB by defailt. Desired File size may be specified via HTTP GET parameters via the name 'fileSize' which accepts a numberic value indicating the size in megabytes. As with other calls, the GET parameter 'delay' may be used to emulate a delay before the reponse is sent. 

## Starting the application
npm run start

You can find more details on my personal blog [https://www.matthewdalby.dev]()