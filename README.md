
![Alt text](images/mock-api.png)

#Mock API

#Background
I have been recently working on a side project which involves a lot of downloading operations. In the past I have worked with mock data as needed, and finally decided to formalize my efforts and share with the community.

This project is a NodeJS based effort to provide APIs that serve mock data for development purposes. The following calls are supported, I will be adding  new use cases in the future as needed.

##API endpoints
###Binary files
Provides binary files, both small and larger.

`./files/`
Emulates a list of files for download.

`./files/[file name]`
Downloads a selected file. The reference to to the *file name* is irrelevant, an empty file will be returned. This method will also accept the HTTP GET variable 'size' which will allow the caller to indicate the desired size that the returned file should assume. Additionally, the parameter 'cache' can be used to indicate to the API that it should return HTTP header information (cache-control) which an HTTP client can use to determine if it should cache the respones.

###Customer data
Paginated sample customer/person data

`/customers/`
Returns a paginated set of customers.

`/customer/[customer id]`
Returns a customer by it's unique id.

###Images
Creates images both full sized and thumbnails.

`/images`
Returns a list of images.

`/images/[image id]`
Returns an PNG image by ID.

###PDF 
PDF files, which seems to be a popular use case.

`/pdf`
Returns a list of PDFs.

`/pdf/[pdf id]`
Emulates a fetch operation for a selected PDF document. This endpoint also accepts the GET parameter 'pages', which will define the number of pages that should be rendered by the server, usefull when emulatiung large documents.


###States/regions
An example data that seldom changes. HTTP Headers will inform the client that the data may be cached for a specified period of time. Usefull for buildiug and testing clients that make use of caching.

##Starting the application
Simple, just execute `npm run start`

You can find more details on my personal blog [https://www.matthewdalby.dev]()