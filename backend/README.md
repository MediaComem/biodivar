# API:

## Login

### Login

- HTTP method: POST
- Route: /login
- Payload: `{"username": "user", "password": "password"}`
- Example: `/login`
- Return: `{statusCode: 200, message: "Registration Success", data: {"username": "user"}}`
- Error: 
    - Validation: `{"error": "Bad Request","message": "Invalid request params input","statusCode": 400}`
    - Validation: `{"error": "Bad Request",statusCode: 400, message: "Login Failure"}`
    - Internal: `{"error": "Internal server error","message": "Error depending","statusCode": 500}`

### Logout

- HTTP method: GET
- Route: /logout
- Example: `/logout`
- Return: `{statusCode: 200, message: "Logout Success"}`

## Users

### User Creation

- HTTP method: POST
- Route: /register
- Payload: `{"username": "user", "email": "email", "password": "password"}`
- Example: `/register`
- Return: `{statusCode: 200, message: "Registration Success", data: {"id": id, "username": "user", "email": "email", "password": "password", "creation_date": "date", "udpate_date": "null", "deleted_date": "null"}}`
- Error: 
    - Validation: `{"error": "Bad Request","message": "Invalid request params input","statusCode": 400}`
    - Internal: `{"error": "Internal server error","message": "Error depending","statusCode": 500}`

### User Update

- HTTP method: POST
- Route: /user/update
- Payload `{"id: id, username": "user", "email": "email", "password": "password"}`
- Example: `/user/update`
- Return: `{statusCode: 200, message: "User update done successfully", data: {"id": id, "username": "user", "email": "email", "password": "password", "creation_date": "date", "udpate_date": "date", "deleted_date": "null"}}`
- Error: 
    - Validation: `{"error": "Bad Request","message": "Mandatory fields are not provided","statusCode": 400}`
    - Internal: `{"error": "Internal server error","message": "Cannot update the user due to error","statusCode": 500}`

### User Deletion

- HTTP method: POST
- Route: /user/delete
- Payload `{"id: id, username": "user", "email": "email", "password": "password"}`
- Example: `/user/delete`
- Return: `{statusCode: 200, message: "User deletion done successfully", data: {"id": id, "username": "user", "email": "email", "password": "password", "creation_date": "date", "udpate_date": "date", "deleted_date": "date"}}`
- Error: 
    - Validation: `{"error": "Bad Request","message": "Mandatory fields are not provided","statusCode": 400}`
    - Internal: `{"error": "Internal server error","message": "Cannot delete the user due to error","statusCode": 500}`

## Biovers

### Get All public Biovers

- HTTP method: GET
- Route: /biovers
- Example: `/biovers`
- Return:
    - When content: `{statusCode: 200, message: "Get public biovers done successfully", data:[{"id":1,"name":"name","owner":id,"creation_date":"date","update_date":null,"deleted_date":null,"is_public":true,"Poi":[{"id":1,"title":"POI 1","title_is_visible":true,"subtitle":null,"subtitle_is_visible":false,"author":1,"creation_date":"2022-01-26T13:43:01.892Z","update_date":null,"deleted_date":null,"last_contributor":null,"is_public":true,"is_editable":false,"biovers":1,"radius":15.5,"style_type":"sphere","style_stroke":true,"style_stroke_width":1.2,"style_fill":false,"style_elevation":16.4,"style_elevation_ground":32.4,"style_noise":22.3,"style_is_visible":true,"visible_from":455.5,"trigger_mode":"location","metadata":null,"coordinate":null,"UserTrace":[],"Event":[]},{"id":2,"title":"POI 1","title_is_visible":true,"subtitle":null,"subtitle_is_visible":false,"author":1,"creation_date":"2022-01-26T13:43:01.892Z","update_date":null,"deleted_date":null,"last_contributor":null,"is_public":true,"is_editable":false,"biovers":1,"radius":15.5,"style_type":"sphere","style_stroke":true,"style_stroke_width":1.2,"style_fill":false,"style_elevation":16.4,"style_elevation_ground":32.4,"style_noise":22.3,"style_is_visible":true,"visible_from":455.5,"trigger_mode":"location","metadata":null,"coordinate":null,"UserTrace":[],"Event":[]}]}`
    - Without content: `{statusCode: 204, message: "Get public biovers done successfully"}`
- Error:
    - Internal: `{"error": "Internal server error","message": "Cannot get public biovers due to error","statusCode": 500}`

### Get biovers by ID

- HTTP method: GET
- Route: /biovers/id
- Query Parameter: `id=id`
- Example: `/biovers/id?id=1`
- Return: 
    - When content: `{statusCode: 200, message: "Get biovers done successfully", data: {"id":1,"name":"Biovers 1","owner":1,"creation_date":"2022-01-26T13:43:02.007Z","update_date":null,"deleted_date":null,"is_public":true,"Poi":[{"id":1,"title":"POI 1","title_is_visible":true,"subtitle":null,"subtitle_is_visible":false,"author":1,"creation_date":"2022-01-26T13:43:01.892Z","update_date":null,"deleted_date":null,"last_contributor":null,"is_public":true,"is_editable":false,"biovers":1,"radius":15.5,"style_type":"sphere","style_stroke":true,"style_stroke_width":1.2,"style_fill":false,"style_elevation":16.4,"style_elevation_ground":32.4,"style_noise":22.3,"style_is_visible":true,"visible_from":455.5,"trigger_mode":"location","metadata":null,"coordinate":null}}`
    - Without content: `{statusCode: 204, message: "Get biovers done successfully"}`
- Error:
    - Internal: `{"error": "Internal server error","message": "Cannot get biovers due to error","statusCode": 500}`

### Get all biovers of a dedicated user

- HTTP method: GET
- Route: /biovers/user
- Example: `/biovers/user`
- Return: 
    - When content: `{statusCode: 200, message: "Get biovers done successfully", data: [{"id":1,"name":"Biovers 1","owner":1,"creation_date":"2022-01-26T13:43:02.007Z","update_date":null,"deleted_date":null,"is_public":true,"Poi":[{"id":1,"title":"POI 1","title_is_visible":true,"subtitle":null,"subtitle_is_visible":false,"author":1,"creation_date":"2022-01-26T13:43:01.892Z","update_date":null,"deleted_date":null,"last_contributor":null,"is_public":true,"is_editable":false,"biovers":1,"radius":15.5,"style_type":"sphere","style_stroke":true,"style_stroke_width":1.2,"style_fill":false,"style_elevation":16.4,"style_elevation_ground":32.4,"style_noise":22.3,"style_is_visible":true,"visible_from":455.5,"trigger_mode":"location","metadata":null,"coordinate":null},{"id":2,"title":"POI 1","title_is_visible":true,"subtitle":null,"subtitle_is_visible":false,"author":1,"creation_date":"2022-01-26T13:43:01.892Z","update_date":null,"deleted_date":null,"last_contributor":null,"is_public":true,"is_editable":false,"biovers":1,"radius":15.5,"style_type":"sphere","style_stroke":true,"style_stroke_width":1.2,"style_fill":false,"style_elevation":16.4,"style_elevation_ground":32.4,"style_noise":22.3,"style_is_visible":true,"visible_from":455.5,"trigger_mode":"location","metadata":null,"coordinate":null},{"id":3,"title":"POI 1","title_is_visible":true,"subtitle":null,"subtitle_is_visible":false,"author":1,"creation_date":"2022-01-26T13:43:02.026Z","update_date":null,"deleted_date":null,"last_contributor":1,"is_public":true,"is_editable":false,"biovers":1,"radius":15.5,"style_type":"sphere","style_stroke":true,"style_stroke_width":1.2,"style_fill":false,"style_elevation":16.4,"style_elevation_ground":32.4,"style_noise":22.3,"style_is_visible":true,"visible_from":455.5,"trigger_mode":"location","metadata":null,"coordinate":null}]},{"id":3,"name":"Biovers 3","owner":1,"creation_date":"2022-01-26T13:43:02.012Z","update_date":null,"deleted_date":null,"is_public":false,"Poi":[]}]}`
    - Without content: `{statusCode: 204, message: "Get biovers done successfully"}`
- Error:
    - Internal: `{"error": "Internal server error","message": "Cannot get biovers due to error","statusCode": 500}`

### Biovers Creation

- HTTP method: POST
- Route: /biovers/create
- Payload: `{"name": "a", "owner": 1}`
- Additionnal information: The owner id isn't mandatory but could be sent and it will use to sent the owner in DB. Otherwise, the cookie add this information for you.
- Example: `/biovers/create`
- Return: `{statusCode: 200, message: "Biovers creation done successfully", data: {"id":5,"name":"a","owner":1,"creation_date":"2022-01-26T15:07:32.242Z","update_date":null,"deleted_date":null,"is_public":true}}`
- Error:
    - Internal: `{"error": "Internal server error","message": "Cannot create biovers due to error","statusCode": 500}`

### Biovers Update

- HTTP method: POST
- Route: /biovers/update
- Payload: `{"id": 1, "name": "Test", "owner": 1}`
- Example: `/biovers/update`
- Return: `{statusCode: 200, message: "Biovers update done successfully", data: {"id":5,"name":"Test","owner":1,"creation_date":"2022-01-26T15:07:32.242Z","update_date":"2022-01-26T15:07:32.242Z","deleted_date":null,"is_public":true}}`
- Error:
    - Internal: `{"error": "Internal server error","message": "Cannot update biovers due to error","statusCode": 500}`

### Biovers Deletion

- HTTP method: POST
- Route: /biovers/delete
- Payload: `{"id": 1, "name": "Test", "owner": 1}`
- Example: `/user/delete`
- Return: `{statusCode: 200, message: "Biovers deletion done successfully", data: {"id":1,"name":"Test","owner":1,"creation_date":"2022-01-26T15:07:32.242Z","update_date":"2022-01-26T15:07:32.242Z","deleted_date":"2022-01-26T15:07:32.242Z","is_public":true}}`
- Error:
    - Internal: `{"error": "Internal server error","message": "Cannot delete biovers due to error","statusCode": 500}`

## POI

### Get POI by ID

- HTTP method: GET
- Route: /poi/id
- Query Parameter: `id=id`
- Example: `/poi/id?id=46`
- Return: 
    - When content: `{statusCode: 200, message: "Get POI done successfully", data: {"id":46,"title":"POI 1","title_is_visible":true,"subtitle":null,"subtitle_is_visible":false,"author":1,"creation_date":"2022-01-26T15:13:20.478Z","update_date":null,"deleted_date":null,"last_contributor":1,"is_public":true,"is_editable":false,"biovers":1,"radius":15.5,"style_type":"sphere","style_stroke":true,"style_stroke_width":1.2,"style_fill":false,"style_elevation":16.4,"style_elevation_ground":32.4,"style_noise":22.3,"style_is_visible":true,"visible_from":455.5,"trigger_mode":"location","metadata":null},"symbol":{"id":44,"media_type":"Video","url":"/specific/path","elevation_ground":355.36,"is_facing_user":false,"is_visible":true,"creation_date":"2022-01-31T16:43:18.570Z","update_date":null,"deleted_date":null,"poi_id":392}`
    - Without content: `{statusCode: 204, message: "Get POI done successfully"}`
- Error:
    - Internal: `{"error": "Internal server error","message": "Cannot get poi due to error","statusCode": 500}`

### Get POI by title

- HTTP method: GET
- Route: /poi/title
- Query Parameter: `title=title`
- Example: `/poi/title?title=POI 1`
- Return: 
    - When content: `{statusCode: 200, message: "Get POI done successfully", data: {"id":46,"title":"POI 1","title_is_visible":true,"subtitle":null,"subtitle_is_visible":false,"author":1,"creation_date":"2022-01-26T15:13:20.478Z","update_date":null,"deleted_date":null,"last_contributor":1,"is_public":true,"is_editable":false,"biovers":1,"radius":15.5,"style_type":"sphere","style_stroke":true,"style_stroke_width":1.2,"style_fill":false,"style_elevation":16.4,"style_elevation_ground":32.4,"style_noise":22.3,"style_is_visible":true,"visible_from":455.5,"trigger_mode":"location","metadata":null},"symbol":{"id":44,"media_type":"Video","url":"/specific/path","elevation_ground":355.36,"is_facing_user":false,"is_visible":true,"creation_date":"2022-01-31T16:43:18.570Z","update_date":null,"deleted_date":null,"poi_id":392}`
    - Without content: `{statusCode: 204, message: "Get POI done successfully"}`
- Error:
    - Internal: `{"error": "Internal server error","message": "Cannot get poi due to error","statusCode": 500}`

### POI Creation

- HTTP method: POST
- Route: /poi/create
- Payload: `{"title":"POI 1","title_is_visible":true,"author":1,"creation_date":"2022-01-26T15:13:20.262Z","biovers":1,"radius":15.5,"style_type":"sphere","style_stroke":true,"style_stroke_width":1.2,"style_fill":false,"style_elevation":16.4,"style_elevation_ground":32.4,"style_noise":22.3,"style_is_visible":true,"visible_from":455.5,"trigger_mode":"location","coordinate":{"long":12.2,"lat":13.3,"alt":14.4,"creation_date":"2022-01-26T15:13:20.262Z"},"symbol":{"media_type":"Video","url":"/specific/path","elevation_ground":355.36,"is_facing_user":false,"is_visible":true}}`
- Coordinate and Symbol are not mandatory
- Example: `/poi/create`
- Return: `{statusCode: 200, message: "POI creation done successfully", data:  {"id":46,"title":"POI 1","title_is_visible":true,"subtitle":null,"subtitle_is_visible":false,"author":1,"creation_date":"2022-01-26T15:13:20.478Z","update_date":null,"deleted_date":null,"last_contributor":1,"is_public":true,"is_editable":false,"biovers":1,"radius":15.5,"style_type":"sphere","style_stroke":true,"style_stroke_width":1.2,"style_fill":false,"style_elevation":16.4,"style_elevation_ground":32.4,"style_noise":22.3,"style_is_visible":true,"visible_from":455.5,"trigger_mode":"location","metadata":null},"symbol":{"id":44,"media_type":"Video","url":"/specific/path","elevation_ground":355.36,"is_facing_user":false,"is_visible":true,"creation_date":"2022-01-31T16:43:18.570Z","update_date":null,"deleted_date":null,"poi_id":392}}`
- Error: 
    - Internal: `{"error": "Internal server error","message": "Cannot create poi due to error","statusCode": 500}`

### POI Update

- HTTP method: POST
- Route: /poi/update
- Payload: `{"id":46,"title":"POI 1","title_is_visible":true,"author":1,"creation_date":"2022-01-26T15:13:20.262Z","biovers":1,"radius":15.5,"style_type":"sphere","style_stroke":true,"style_stroke_width":1.2,"style_fill":false,"style_elevation":16.4,"style_elevation_ground":32.4,"style_noise":22.3,"style_is_visible":true,"visible_from":455.5,"trigger_mode":"location","coordinate":{"long":12.2,"lat":13.3,"alt":14.4,"creation_date":"2022-01-26T15:13:20.262Z"},"symbol":{"media_type":"Video","url":"/specific/path","elevation_ground":355.36,"is_facing_user":false,"is_visible":true}}`
- Coordinate and Symbol are not mandatory
- Example: `/poi/update`
- Return: `{statusCode: 200, message: "POI update done successfully", data:{"id":46,"title":"POI 1","title_is_visible":true,"subtitle":null,"subtitle_is_visible":false,"author":1,"creation_date":"2022-01-26T15:13:20.478Z","update_date":"2022-01-26T15:13:20.478Z","deleted_date":null,"last_contributor":1,"is_public":true,"is_editable":false,"biovers":1,"radius":15.5,"style_type":"sphere","style_stroke":true,"style_stroke_width":1.2,"style_fill":false,"style_elevation":16.4,"style_elevation_ground":32.4,"style_noise":22.3,"style_is_visible":true,"visible_from":455.5,"trigger_mode":"location","metadata":null},"symbol":{"id":44,"media_type":"Video","url":"/specific/path","elevation_ground":355.36,"is_facing_user":false,"is_visible":true,"creation_date":"2022-01-31T16:43:18.570Z","update_date":"2022-01-31T16:43:18.570Z","deleted_date":null,"poi_id":392}}`
- Error: 
    - Internal: `{"error": "Internal server error","message": "Cannot update poi due to error","statusCode": 500}`

### POI Deletion

- HTTP method: POST
- Route: /poi/delete
- Payload: `{"id":1,"title":"POI 1","title_is_visible":true,"subtitle":null,"subtitle_is_visible":false,"author":1,"creation_date":"2022-01-24T15:13:20.478Z","update_date":"2022-01-25T15:13:20.478Z","deleted_date":"2022-01-26T15:13:20.478Z","last_contributor":1,"is_public":true,"is_editable":false,"biovers":1,"radius":15.5,"style_type":"sphere","style_stroke":true,"style_stroke_width":1.2,"style_fill":false,"style_elevation":16.4,"style_elevation_ground":32.4,"style_noise":22.3,"style_is_visible":true,"visible_from":455.5,"trigger_mode":"location","metadata":null},"symbol":{"media_type":"Video","url":"/specific/path","elevation_ground":355.36,"is_facing_user":false,"is_visible":true}`
- Coordinate and Symbol are not mandatory
- Example: `/poi/delete`
- Return: `{statusCode: 200, message: "POI deletion done successfully", data:{"id":1,"title":"POI 1","title_is_visible":true,"subtitle":null,"subtitle_is_visible":false,"author":1,"creation_date":"2022-01-24T15:13:20.478Z","update_date":"2022-01-25T15:13:20.478Z","deleted_date":"2022-01-26T15:13:20.478Z","last_contributor":1,"is_public":true,"is_editable":false,"biovers":1,"radius":15.5,"style_type":"sphere","style_stroke":true,"style_stroke_width":1.2,"style_fill":false,"style_elevation":16.4,"style_elevation_ground":32.4,"style_noise":22.3,"style_is_visible":true,"visible_from":455.5,"trigger_mode":"location","metadata":null},"symbol":{"id":44,"media_type":"Video","url":"/specific/path","elevation_ground":355.36,"is_facing_user":false,"is_visible":true,"creation_date":"2022-01-31T16:43:18.570Z","update_date":null,"deleted_date":"2022-01-31T16:43:18.570Z","poi_id":392}}`
- Error: 
    - Internal: `{"error": "Internal server error","message": "Cannot delete poi due to error","statusCode": 500}`

## PATH

### Get PATH by ID

- HTTP method: GET
- Route: /path/id
- Query Parameter: `id=id`
- Example: `/path/id?id=29`
- Return: 
    - When content: `{statusCode: 200, message: "Get Path done successfully", data: {"id":29,"author":1,"creation_date":"2022-01-31T09:34:18.526Z","update_date":null,"deleted_date":null,"last_contributor":1,"is_public":true,"is_editable":false,"biovers":1,"style_type":"sphere","style_stroke":true,"style_stroke_width":1.2,"style_elevation":16.4,"style_elevation_ground":32.4,"style_noise":22.3,"style_is_visible":true,"visible_from":455.5,"metadata":null,"coordinate":[{"id":185,"long":12.2,"lat":13.3,"alt":14.4,"creation_date":"2022-01-31T09:34:18.526Z","update_date":null,"deleted_date":null,"poi_id":null,"path_id":29},{"id":186,"long":12.2,"lat":13.3,"alt":14.4,"creation_date":"2022-01-31T09:34:18.526Z","update_date":null,"deleted_date":null,"poi_id":null,"path_id":29}]}`
    - Without content: `{statusCode: 204, message: "Get path done successfully"}`
- Error:
    - Internal: `{"error": "Internal server error","message": "Cannot get path due to error","statusCode": 500}`

### Get PATH by user

- HTTP method: GET
- Route: /path/user
- Query Parameter: `id=id`
- Example: `/path/user?user=1`
- Return: 
    - When content: `{statusCode: 200, message: "Get Path done successfully", data: {"id":29,"author":1,"creation_date":"2022-01-31T09:34:18.526Z","update_date":null,"deleted_date":null,"last_contributor":1,"is_public":true,"is_editable":false,"biovers":1,"style_type":"sphere","style_stroke":true,"style_stroke_width":1.2,"style_elevation":16.4,"style_elevation_ground":32.4,"style_noise":22.3,"style_is_visible":true,"visible_from":455.5,"metadata":null,"coordinate":[{"id":185,"long":12.2,"lat":13.3,"alt":14.4,"creation_date":"2022-01-31T09:34:18.526Z","update_date":null,"deleted_date":null,"poi_id":null,"path_id":29},{"id":186,"long":12.2,"lat":13.3,"alt":14.4,"creation_date":"2022-01-31T09:34:18.526Z","update_date":null,"deleted_date":null,"poi_id":null,"path_id":29}]}`
    - Without content: `{statusCode: 204, message: "Get path done successfully"}`
- Error:
    - Internal: `{"error": "Internal server error","message": "Cannot get path due to error","statusCode": 500}`

### PATH Creation

- HTTP method: POST
- Route: /path/create
- Payload: `{"author":1,"creation_date":"2022-01-31T09:34:18.415Z","biovers":1,"style_type":"sphere","style_stroke":true,"style_stroke_width":1.2,"style_elevation":16.4,"style_elevation_ground":32.4,"style_noise":22.3,"style_is_visible":true,"visible_from":455.5,"coordinate":[{"long":12.2,"lat":13.3,"alt":14.4,"creation_date":"2022-01-31T09:34:18.415Z"},{"long":12.2,"lat":13.3,"alt":14.4,"creation_date":"2022-01-31T09:34:18.415Z"}]}`
- Example: `/path/create`
- Return: `{statusCode: 200, message: "Path creation done successfully", data: {"id":29,"author":1,"creation_date":"2022-01-31T09:34:18.526Z","update_date":null,"deleted_date":null,"last_contributor":1,"is_public":true,"is_editable":false,"biovers":1,"style_type":"sphere","style_stroke":true,"style_stroke_width":1.2,"style_elevation":16.4,"style_elevation_ground":32.4,"style_noise":22.3,"style_is_visible":true,"visible_from":455.5,"metadata":null,"coordinate":[{"id":185,"long":12.2,"lat":13.3,"alt":14.4,"creation_date":"2022-01-31T09:34:18.526Z","update_date":null,"deleted_date":null,"poi_id":null,"path_id":29},{"id":186,"long":12.2,"lat":13.3,"alt":14.4,"creation_date":"2022-01-31T09:34:18.526Z","update_date":null,"deleted_date":null,"poi_id":null,"path_id":29}]}}`
- Error:
    - Internal: `{"error": "Internal server error","message": "Cannot create path due to error","statusCode": 500}`

### PATH Update

- HTTP method: POST
- Route: /pah/update
- Payload: `{"id":1,"author":1,"creation_date":"2022-01-31T09:35:26.799Z","update_date":null,"deleted_date":null,"last_contributor":null,"is_public":true,"is_editable":false,"biovers":1,"style_type":"sphere","style_stroke":true,"style_stroke_width":1.2,"style_elevation":16.4,"style_elevation_ground":32.4,"style_noise":22.3,"style_is_visible":true,"visible_from":455.5,"metadata":"This is a test","coordinate":[{"id":200,"long":12.2,"lat":13.3,"alt":999.99,"creation_date":"2022-01-31T09:35:26.643Z","update_date":null,"deleted_date":null,"poi_id":null,"path_id":1},{"id":201,"long":12.2,"lat":13.3,"alt":14.4,"creation_date":"2022-01-31T09:35:26.643Z","update_date":null,"deleted_date":null,"poi_id":null,"path_id":1}]}`
- Example: `/path/update`
- Return: `{statusCode: 200, message: "Path update done successfully", data: {"id":1,"author":1,"creation_date":"2022-01-31T09:35:26.799Z","update_date":"2022-01-31T09:35:26.815Z","deleted_date":null,"last_contributor":1,"is_public":true,"is_editable":false,"biovers":1,"style_type":"sphere","style_stroke":true,"style_stroke_width":1.2,"style_elevation":16.4,"style_elevation_ground":32.4,"style_noise":22.3,"style_is_visible":true,"visible_from":455.5,"metadata":"This is a test","coordinate":[{"id":200,"long":12.2,"lat":13.3,"alt":999.99,"creation_date":"2022-01-31T09:35:26.643Z","update_date":"2022-01-31T09:35:26.808Z","deleted_date":null,"poi_id":null,"path_id":1},{"id":201,"long":12.2,"lat":13.3,"alt":14.4,"creation_date":"2022-01-31T09:35:26.643Z","update_date":"2022-01-31T09:35:26.812Z","deleted_date":null,"poi_id":null,"path_id":1}]}}`
- Error:
    - Internal: `{"error": "Internal server error","message": "Cannot update path due to error","statusCode": 500}`

### PATH Deletion

- HTTP method: POST
- Route: /path/delete
- Payload: `{"id":1,"author":1,"creation_date":"2022-01-31T09:36:25.697Z","update_date":null,"deleted_date":null,"last_contributor":null,"is_public":true,"is_editable":false,"biovers":1,"style_type":"sphere","style_stroke":true,"style_stroke_width":1.2,"style_elevation":16.4,"style_elevation_ground":32.4,"style_noise":22.3,"style_is_visible":true,"visible_from":455.5,"metadata":null,"coordinate":[{"id":219,"long":12.2,"lat":13.3,"alt":14.4,"creation_date":"2022-01-31T09:36:25.494Z","update_date":null,"deleted_date":null,"poi_id":null,"path_id":1},{"id":220,"long":12.2,"lat":13.3,"alt":14.4,"creation_date":"2022-01-31T09:36:25.494Z","update_date":null,"deleted_date":null,"poi_id":null,"path_id":1}]}`
- Example: `/path/delete`
- Return: `{statusCode: 200, message: "Path deletion done successfully", data: {"id":1,"author":1,"creation_date":"2022-01-31T09:36:25.697Z","update_date":null,"deleted_date":"2022-01-31T09:36:25.706Z","last_contributor":null,"is_public":true,"is_editable":false,"biovers":1,"style_type":"sphere","style_stroke":true,"style_stroke_width":1.2,"style_elevation":16.4,"style_elevation_ground":32.4,"style_noise":22.3,"style_is_visible":true,"visible_from":455.5,"metadata":null,"coordinate":[{"id":219,"long":12.2,"lat":13.3,"alt":14.4,"creation_date":"2022-01-31T09:36:25.494Z","update_date":null,"deleted_date":"2022-01-31T09:36:25.706Z","poi_id":null,"path_id":1},{"id":220,"long":12.2,"lat":13.3,"alt":14.4,"creation_date":"2022-01-31T09:36:25.494Z","update_date":null,"deleted_date":"2022-01-31T09:36:25.706Z","poi_id":null,"path_id":1}]}}`
- Error:
    - Internal: `{"error": "Internal server error","message": "Cannot delete path due to error","statusCode": 500}`

## Symbol

### Get Symbol by ID

- HTTP method: GET
- Route: /symbol/id
- Query Parameter: `id=id`
- Example: `/symbol/id?id=2`
- Return: 
    - When content: `Transmits a file from the file system. The 'Content-Type' header defaults to the matching mime type based on filename extension.`
- Error:
    - Internal: `{"error": "Internal server error","message": "Cannot get symbol due to error","statusCode": 500}`

### Get Symbol AR by ID

- HTTP method: GET
- Route: /symbol_ar/id
- Query Parameter: `id=id`
- Example: `/symbol/id?id=2`
- Return: 
    - When content: `Transmits a file from the file system. The 'Content-Type' header defaults to the matching mime type based on filename extension.`
- Error:
    - Internal: `{"error": "Internal server error","message": "Cannot get symbol due to error","statusCode": 500}`

### Symbol Creation

- HTTP method: POST
- Route: /symbol/create
- Payload: `File content in DataForm format`
- Example: `/symbol/create`
- Return: `Location path of the symbol on the file system`
- Error:
    - Internal: `{"error": "Internal server error","message": "Cannot create symbol due to error","statusCode": 500}`

### Symbol Update

- HTTP method: POST
- Route: /symbol/update
- Payload: `{id: 2, media_type: 'Test',url: '/specific/path',elevation_ground: 355.36,is_facing_user: false,is_visible: true,creation_date: 2022-03-03T15:47:33.368Z,update_date: null,deleted_date: null,poi_id: 2}`
- Example: `/symbol/create`
- Return: `{statusCode: 200,message: 'Symbol update done successfully',data: {id: 2,media_type: 'Test',url: '/specific/path',elevation_ground: 355.36,is_facing_user: false,is_visible: true,creation_date: 2022-03-03T15:47:33.368Z,update_date: 2022-03-04T15:47:33.368Z,deleted_date: null,poi_id: 2}}`
- Error:
    - Internal: `{"error": "Internal server error","message": "Cannot update symbol due to error","statusCode": 500}`

### Symbol Deletion

- HTTP method: POST
- Route: /symbol/delete
- Payload: `{id: 2, media_type: 'Test',url: '/specific/path',elevation_ground: 355.36,is_facing_user: false,is_visible: true,creation_date: 2022-03-03T15:47:33.368Z,update_date: null,deleted_date: null,poi_id: 2}`
- Example: `/symbol/delete`
- Return: `{statusCode: 200,message: 'Symbol update done successfully',data: {id: 2,media_type: 'Test',url: '/specific/path',elevation_ground: 355.36,is_facing_user: false,is_visible: true,creation_date: 2022-03-03T15:47:33.368Z,update_date: 2022-03-04T15:47:33.368Z,deleted_date: 2022-03-05T15:47:33.368Z,poi_id: 2}}`
- Error:
    - Internal: `{"error": "Internal server error","message": "Cannot delete symbol due to error","statusCode": 500}`

## Media

### Get Media by ID

- HTTP method: GET
- Route: /media/id
- Query Parameter: `id=id`
- Example: `/media/id?id=2`
- Return: 
    - When content: `Transmits a file from the file system. The 'Content-Type' header defaults to the matching mime type based on filename extension.`
- Error:
    - Internal: `{"error": "Internal server error","message": "Cannot get media due to error","statusCode": 500}`

### Media Creation

- HTTP method: POST
- Route: /media/create
- Payload: `File content in DataForm format`
- Example: `/media/create`
- Return: `Location path of the symbol on the file system`
- Error:
    - Internal: `{"error": "Internal server error","message": "Cannot create media due to error","statusCode": 500}`

### Media Update

- HTTP method: POST
- Route: /media/update
- Payload: `{id: 2, media_type: 'Test',url: '/specific/path',elevation_ground: 355.36,is_facing_user: false,is_visible: true,caption:'test',caption_is_visible: true,creation_date: 2022-03-03T15:47:33.368Z,update_date: null,deleted_date: null,poi_id: 2}`
- Example: `/media/create`
- Return: `{statusCode: 200,message: 'Media update done successfully',data: {id: 2,media_type: 'Test',url: '/specific/path',elevation_ground: 355.36,is_facing_user: false,is_visible: true,caption:'test',caption_is_visible: true,creation_date: 2022-03-03T15:47:33.368Z,update_date: 2022-03-04T15:47:33.368Z,deleted_date: null,poi_id: 2}}`
- Error:
    - Internal: `{"error": "Internal server error","message": "Cannot update media due to error","statusCode": 500}`

### Media Deletion

- HTTP method: POST
- Route: /media/delete
- Payload: `{id: 1, media_type: 'Test',url: '/specific/path',elevation_ground: 355.36,is_facing_user: false,is_visible: true,caption:'test',caption_is_visible: true,creation_date: 2022-03-03T15:47:33.368Z,update_date: null,deleted_date: null,poi_id: 2}`
- Example: `/media/delete`
- Return: `{statusCode: 200,message: 'Media update done successfully',data: {id: 2,media_type: 'Test',url: '/specific/path',elevation_ground: 355.36,is_facing_user: false,is_visible: true,caption:'test',caption_is_visible: true,creation_date: 2022-03-03T15:47:33.368Z,update_date: 2022-03-04T15:47:33.368Z,deleted_date: 2022-03-05T15:47:33.368Z,poi_id: 2}}`
- Error:
    - Internal: `{"error": "Internal server error","message": "Cannot delete media due to error","statusCode": 500}`

## User Trace

### User Trace Creation

- HTTP method: POST
- Route: /user_trace/create
- Payload: `{id: 2, gps_accuracy: 13.3, author: 1, biovers: 1, is_public}`
- Example: `/media/delete`
- Return: `{statusCode: 200,message: 'User trace creation done successfully',data: {id: 7,creation_date: 2022-07-11T10:01:29.303Z,update_date: null,deleted_date: null,author: 1,is_public: true,gps_accuracy: 2.3,biovers: 1,coordinate: {id: 221,long: 13.3,lat: 12.2,alt: 14.4,creation_date: 2022-07-11T10:01:29.303Z,update_date: null,deleted_date: null,poi_id: null,path_id: null,user_trace_id: 7}}`
- Error:
    - Internal: `{"error": "Internal server error","message": "Cannot create user trace due to error","statusCode": 500}`

### User Trace Deletion

- HTTP method: POST
- Route: /user_trace/delete
- Payload: `{id: 1,creation_date: 2022-07-11T10:01:29.359Z,update_date: null,deleted_date: 2022-07-11T10:01:29.365Z,author: 1,is_public: true,gps_accuracy: 2.3,biovers: 1}`
- Example: `/media/delete`
- Return: ` {statusCode: 200,message: 'User trace deletion done successfully',data: {id: 1,creation_date: 2022-07-11T10:01:29.359Z,update_date: null,deleted_date: 2022-07-11T10:01:29.365Z,author: 1,is_public: true,gps_accuracy: 2.3,biovers: 1}}`
- Error:
    - Internal: `{"error": "Internal server error","message": "Cannot delete user trace due to error","statusCode": 500}`

## Event

### Event Creation

- HTTP method: POST
- Route: /event/create
- Payload: `{author: 1, biovers: 1, data: '{Event: "Open Biovers"}'}`
- Example: `/event/create`
- Return: `{statusCode: 200,message: 'User trace creation done successfully',data: {id: 5,creation_date: 2022-07-11T10:56:06.693Z,deleted_date: null,author: 1,biovers: 1,data: '{Event: "Open Biovers"}'}}`
- Error:
    - Internal: `{"error": "Internal server error","message": "Cannot create event due to error","statusCode": 500}`

### Event Deletion

- HTTP method: POST
- Route: /event/delete
- Payload: `{id: 1, author: 1, biovers: 1, data: '{Event: "Open Biovers"}'}`
- Example: `/event/delete`
- Return: `{statusCode: 200,message: 'User trace deletion done successfully',data: {id: 1,creation_date: 2022-07-11T10:56:06.750Z,deleted_date: 2022-07-11T10:56:06.755Z,author: 1,biovers: 1,data: '{Event: "Open Biovers"}'}}`
- Error:
    - Internal: `{"error": "Internal server error","message": "Cannot delete event due to error","statusCode": 500}`