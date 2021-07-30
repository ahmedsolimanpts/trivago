# trivago

Platform To Search For Free Room in Hotels And Booking Room

# Routing

# USER Routing:

<ol>
<li>Get All User</li>
<p>METHOD --> GET</p> 
<h4>URL SHOUD LIKE:</h4>

<p>https://domin.com/api/getalluser</p>



<li>Add User</li> 
<p>METHOD --> GET</p> 

#### Requierments Fields
<ul>
<li>name</li>
<li>phone</li>
<li>email</li>
<li>password</li>
<li>password2</li>
</ul>
<h4>URL SHOUD LIKE:</h4>

<p>
https://domin.com/api/adduser?name=${value}&email=${value}&phone=${value}&password=${value}&password2=${value}</p>
</ol>

# HOTEL Routing

<ol>
<li>Get All Hotel</li>
<p>METHOD --> GET</p>
<h4>URL SHOUD LIKE:</h4>

<p>https://domin.com/api/getallhotels</p>
</ol>

<ol>
<li>Get Hotel With ID</li>
<p>METHOD --> GET</p> 
<h4>URL SHOUD LIKE:</h4>

<p>https://domin.com/api/getonehotelid</p>
</ol>

<ol>
<li>Get Hotel With Name</li>
<p>METHOD --> GET</p>

### Requierments Fields
<ul>
<li>name</li>
</ul>
<h4>URL SHOUD LIKE:</h4>

<p>https://domin.com/api/getonehotelname</p>
</ol>


<ol>
<li>ADD  NEW Hotel </li>
<p>METHOD --> GET</p>

### Requierments Fields
<ul>
<li>name</li>
<li>phone</li>
<li>email</li>
<li>admins</li> 
<P>is an email of the user that will be the admin of hotel</p>
<li>description</li>
</ul>
<h4>URL SHOUD LIKE:</h4>

<p>https://domin.com/api/addhotel?name=${value}&phone={value}&email=${value}&description=${value}&admins=${value}</p>
</ol>


<ol>
<li>Delete Hotel </li>
<p>METHOD --> POST</p>

### Requierments Fields
<ul>
<li>id</li>
</ul>
<h4>URL SHOUD LIKE:</h4>

<p>https://domin.com/api/deletehotel</p>
</ol>

# ROOM Routing
<ol>
<li>ADD New ROOM </li>
<p>METHOD --> POST</p>

### Requierments Fields
<ul>
<li>roomid</li>
<li>floor</li>
<li>hotelname</li>
<li>description</li> 
<li>salary</li>
</ul>
<h4>URL SHOUD LIKE:</h4>

<p>https://domin.com/api/addroom</p>
</ol>

<ol>
<li>GET ALL ROOMs </li>
<p>METHOD --> GET</p> 
<h4>URL SHOUD LIKE:</h4>

<p>https://domin.com/api/getrooms</p>
</ol>

<ol>
<li>GET ALL ROOMs IN HOTEL</li>
<p>METHOD --> POST </p> 

### Requierments Fields
<ul>
<li>hotelname</li>
</ul>
<h4>URL SHOUD LIKE:</h4>

<p>https://domin.com/api/getallroomhotel</p>
</ol>
<ol>

<li>DELETE ROOM IN HOTEL</li>
<p>METHOD --> POST </p> 

### Requierments Fields
<ul>
<li>roomid</li>
<li>roomfloor</li>
<li>hotelname</li>
</ul>
<h4>URL SHOUD LIKE:</h4>

<p>https://domin.com/api/deleteroom</p>
</ol>

# DEPARTMENT Routing
<ol>
<li>ADD New DEPARTMENT IN HOTEL </li>
<p>METHOD --> POST</p> 

### Requierments Fields
<ul>
<li>name</li>
<li>hotel</li>
</ul>
<h4>URL SHOUD LIKE:</h4>

<p>https://domin.com/api/adddepartment</p>
</ol>


<ol>
<li>GET ALL DEPARTMENT IN ONE HOTEL</li>
<p>METHOD --> POST</p> 

### Requierments Fields
<ul>
<li>hotel</li>
</ul>
<h4>URL SHOUD LIKE:</h4>

<p>https://domin.com/api/gethdepart</p>
</ol>

# Employee Routing
<ol>
<li>ADD New Employee IN HOTEL </li>
<p>METHOD --> POST</p>

### Requierments Fields
<ul>
<li>name</li> //USER NAME
<li>hotel</li> // HOTEL NAME
<li>phone</li>
<li>salary</li>
<li>Department</li> //DEPARTMENT NAME
</ul>
<h4>URL SHOUD LIKE:</h4>

<p>https://domin.com/api/addemp</p>
</ol>

<ol>
<li>GET ALL Employee IN HOTEL </li>
<p>METHOD --> POST</p>

### Requierments Fields
<ul>
<li>hotel</li> // HOTEL NAME
</ul>
<h4>URL SHOUD LIKE:</h4>

<p>https://domin.com/api/hotelemp</p>
</ol>


# CONTACT US Routing
<ol>
<li>ADD New CONTACT Message </li>
<p>METHOD --> POST</p>

### Requierments Fields
<ul>
<li>message</li>
<li>hotel</li> // HOTEL NAME IN HOTEL COLLECTION
<li>user</li> //USER EMAIL IN USER COLLECTION
</ul>
<h4>URL SHOUD LIKE:</h4>

<p>https://domin.com/api/addcontactus</p>
</ol>

<ol>
<li>GET CONTACT Message FOR ONE HOTEL</li>
<p>METHOD --> POST</p> 

### Requierments Fields
<ul>
<li>hotel</li> // HOTEL NAME IN HOTEL COLLECTION
</ul>
<h4>URL SHOUD LIKE:</h4>

<p>https://domin.com/api/gethotelcontaactus</p>
</ol>

<ol>
<li>Delete CONTACT ONE Message FOR ONE USER EMAIL</li>
<p>METHOD --> POST</p> 

### Requierments Fields
<ul>
<li>user</li> // USER EMAIL IN USER COLLECTION
</ul>
<h4>URL SHOUD LIKE:</h4>

<p>https://domin.com/api/deletecontactwemail</p>
</ol>

# REQUEST Routing

<ol>
<li>ADD New REQUEST Message </li>
<p>METHOD --> GET</p> 

### Requierments Fields
<ul>
<li>from</li>
<li>to</li>
<li>hotel</li> // HOTEL NAME IN HOTEL COLLECTION
<li>user</li> //USER EMAIL IN USER COLLECTION
<br>
//----optimal fields update win get offer or accept request-------//
<li>totalsalary</li>
<li>room</li>
<li>inoffer</li>
<li>offerid</li>
</ul>
<h4>URL SHOUD LIKE:</h4>

<p>https://domin.com/api/addrequest?user=${value}&hotel=${value}&from=${value}&to=${value}</p>
</ol>

#### Another Way To Make Request
<ol>
<li>ADD New REQUEST Message </li>
<p>METHOD --> POST</p> 

### Requierments Fields
<ul>
<li>from</li>
<li>to</li>
<li>hotel</li> // HOTEL NAME IN HOTEL COLLECTION
<li>user</li> //USER EMAIL IN USER COLLECTION
//--------------optimal fields update win get offer or accept request------------//
<li>totalsalary</li>
<li>room</li>
<li>inoffer</li>
<li>offerid</li>
</ul>
<h4>URL SHOUD LIKE:</h4>

<p>https://domin.com/api/addrequest</p>
</ol>

<ol>
<li>GET ALL REQUEST IN DB </li>
<p>GET</p> 
<h4>URL SHOUD LIKE:</h4>

<p>https://domin.com/api/getrequest</p>
</ol>

<ol>
<li>GET ALL HOTEL REQUESTS </li>
<p>METHOD --> GET</p>

 ### Requierments Fields

<ul>
<li>hotel</li> // HOTEL NAME IN HOTEL COLLECTION
</ul> 
<h4>URL SHOUD LIKE:</h4>

<p>https://domin.com/api/gethotelrequest?hotel=${value}</p>
</ol>

<ol>
<li>GET ONE REQUESTS </li>
<p>METHOD --> GET</p>

### Requierments Fields
<ul>
<li>id</li> // REQUEST ID IN REQUEST COLLECTION
</ul> 
<h4>URL SHOUD LIKE:</h4>

<p>https://domin.com/api/gethotelrequest?id=${value}</p>
</ol>

<ol>
<li>DELETE REQUEST BY ID </li>
<p>METHOD --> delete</p>

### Requierments Fields

<ul>
<li>id</li> // REQUEST ID IN REQUEST COLLECTION
</ul> 
<h4>URL SHOUD LIKE:</h4>

<p>https://domin.com/api/deleterequestid</p>
</ol>

<ol>
<li>DELETE ALL REQUEST IN ONE HOTEL </li>
<p>METHOD --> delete</p>

### Requierments Fields
<ul>
<li>hotel</li> // hotel name IN hotel COLLECTION
</ul> 
<h4>URL SHOUD LIKE:</h4>

<p>https://domin.com/api/deletehotelrequest</p>
</ol>


# BOOKING Routing

<ol>
<li>GET ALL BOOKING IN DB </li>
<p>METHOD --> GET</p> 
<h4>URL SHOUD LIKE:</h4>

<p>https://domin.com/api/getallbooking</p>
</ol>

<ol>
<li>GET ALL BOOKING IN HOTEL </li>
<p>METHOD --> GET</p> 

### Requierments Fields
<ul>
<li>hotel</li> // HOTEL NAME IN HOTEL COLLECTION
</ul> 
<h4>URL SHOUD LIKE:</h4>

<p>https://domin.com/api/gethotelbooking?hotel=${value}</p>
</ol>