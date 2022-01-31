# API:

## Users

### User Creation

- HTTP method: POST
- Route: /user/create
- Payload: `{"username": "user", "email": "email", "password": "password"}`
- Example: `/user/create`
- Return: `{"id": id, "username": "user", "email": "email", "password": "password", "creation_date": "date", "udpate_date": "null", "deleted_date": "null"}`

### User Update

- HTTP method: POST
- Route: /user/update
- Payload `{"id: id, username": "user", "email": "email", "password": "password"}`
- Example: `/user/update`
- Return: `{"id": id, "username": "user", "email": "email", "password": "password", "creation_date": "date", "udpate_date": "date", "deleted_date": "null"}`

### User Deletion

- HTTP method: POST
- Route: /user/delete
- Payload `{"id: id, username": "user", "email": "email", "password": "password"}`
- Example: `/user/delete`
- Return: `{"id": id, "username": "user", "email": "email", "password": "password", "creation_date": "date", "udpate_date": "date", "deleted_date": "date"}`

## Biovers

### Get All public Biovers

- HTTP method: GET
- Route: /biovers
- Example: `/biovers`
- Return: `[{"id":1,"name":"name","owner":id,"creation_date":"date","update_date":null,"deleted_date":null,"is_public":true,"Poi":[{"id":1,"title":"POI 1","title_is_visible":true,"subtitle":null,"subtitle_is_visible":false,"author":1,"creation_date":"2022-01-26T13:43:01.892Z","update_date":null,"deleted_date":null,"last_contributor":null,"is_public":true,"is_editable":false,"biovers":1,"radius":15.5,"style_type":"sphere","style_stroke":true,"style_stroke_width":1.2,"style_fill":false,"style_elevation":16.4,"style_elevation_ground":32.4,"style_noise":22.3,"style_is_visible":true,"visible_from":455.5,"trigger_mode":"location","metadata":null,"coordinate":null},{"id":2,"title":"POI 1","title_is_visible":true,"subtitle":null,"subtitle_is_visible":false,"author":1,"creation_date":"2022-01-26T13:43:01.892Z","update_date":null,"deleted_date":null,"last_contributor":null,"is_public":true,"is_editable":false,"biovers":1,"radius":15.5,"style_type":"sphere","style_stroke":true,"style_stroke_width":1.2,"style_fill":false,"style_elevation":16.4,"style_elevation_ground":32.4,"style_noise":22.3,"style_is_visible":true,"visible_from":455.5,"trigger_mode":"location","metadata":null,"coordinate":null}]`

### Get all biovers of a dedicated user

- HTTP method: GET
- Route: /biovers/user
- Query Parameter: `id=id`
- Example: `/biovers/user?id=1`
- Return: `[{"id":1,"name":"Biovers 1","owner":1,"creation_date":"2022-01-26T13:43:02.007Z","update_date":null,"deleted_date":null,"is_public":true,"Poi":[{"id":1,"title":"POI 1","title_is_visible":true,"subtitle":null,"subtitle_is_visible":false,"author":1,"creation_date":"2022-01-26T13:43:01.892Z","update_date":null,"deleted_date":null,"last_contributor":null,"is_public":true,"is_editable":false,"biovers":1,"radius":15.5,"style_type":"sphere","style_stroke":true,"style_stroke_width":1.2,"style_fill":false,"style_elevation":16.4,"style_elevation_ground":32.4,"style_noise":22.3,"style_is_visible":true,"visible_from":455.5,"trigger_mode":"location","metadata":null,"coordinate":null},{"id":2,"title":"POI 1","title_is_visible":true,"subtitle":null,"subtitle_is_visible":false,"author":1,"creation_date":"2022-01-26T13:43:01.892Z","update_date":null,"deleted_date":null,"last_contributor":null,"is_public":true,"is_editable":false,"biovers":1,"radius":15.5,"style_type":"sphere","style_stroke":true,"style_stroke_width":1.2,"style_fill":false,"style_elevation":16.4,"style_elevation_ground":32.4,"style_noise":22.3,"style_is_visible":true,"visible_from":455.5,"trigger_mode":"location","metadata":null,"coordinate":null},{"id":3,"title":"POI 1","title_is_visible":true,"subtitle":null,"subtitle_is_visible":false,"author":1,"creation_date":"2022-01-26T13:43:02.026Z","update_date":null,"deleted_date":null,"last_contributor":1,"is_public":true,"is_editable":false,"biovers":1,"radius":15.5,"style_type":"sphere","style_stroke":true,"style_stroke_width":1.2,"style_fill":false,"style_elevation":16.4,"style_elevation_ground":32.4,"style_noise":22.3,"style_is_visible":true,"visible_from":455.5,"trigger_mode":"location","metadata":null,"coordinate":null}]},{"id":3,"name":"Biovers 3","owner":1,"creation_date":"2022-01-26T13:43:02.012Z","update_date":null,"deleted_date":null,"is_public":false,"Poi":[]}]`

### Biovers Creation

- HTTP method: POST
- Route: /biovers/create
- Payload: `{"name": "a", "owner": 1}`
- Example: `/biovers/create`
- Return: `{"id":5,"name":"a","owner":1,"creation_date":"2022-01-26T15:07:32.242Z","update_date":null,"deleted_date":null,"is_public":true}`

### Biovers Update

- HTTP method: POST
- Route: /biovers/update
- Payload: `{"id": 1, "name": "Test", "owner": 1}`
- Example: `/biovers/update`
- Return: `{"id":5,"name":"Test","owner":1,"creation_date":"2022-01-26T15:07:32.242Z","update_date":"2022-01-26T15:07:32.242Z","deleted_date":null,"is_public":true}`

### Biovers Deletion

- HTTP method: POST
- Route: /biovers/delete
- Payload: `{"id": 1, "name": "Test", "owner": 1}`
- Example: `/user/delete`
- Return: `{"id":1,"name":"Test","owner":1,"creation_date":"2022-01-26T15:07:32.242Z","update_date":"2022-01-26T15:07:32.242Z","deleted_date":"2022-01-26T15:07:32.242Z","is_public":true}`

## POI

### POI Creation

- HTTP method: POST
- Route: /poi/create
- Payload: `{"title":"POI 1","title_is_visible":true,"author":1,"creation_date":"2022-01-26T15:13:20.262Z","biovers":1,"radius":15.5,"style_type":"sphere","style_stroke":true,"style_stroke_width":1.2,"style_fill":false,"style_elevation":16.4,"style_elevation_ground":32.4,"style_noise":22.3,"style_is_visible":true,"visible_from":455.5,"trigger_mode":"location","coordinate":{"long":12.2,"lat":13.3,"alt":14.4,"creation_date":"2022-01-26T15:13:20.262Z"}}`
- Example: `/poi/create`
- Return: `{"id":46,"title":"POI 1","title_is_visible":true,"subtitle":null,"subtitle_is_visible":false,"author":1,"creation_date":"2022-01-26T15:13:20.478Z","update_date":null,"deleted_date":null,"last_contributor":1,"is_public":true,"is_editable":false,"biovers":1,"radius":15.5,"style_type":"sphere","style_stroke":true,"style_stroke_width":1.2,"style_fill":false,"style_elevation":16.4,"style_elevation_ground":32.4,"style_noise":22.3,"style_is_visible":true,"visible_from":455.5,"trigger_mode":"location","metadata":null}`

### POI Update

- HTTP method: POST
- Route: /poi/update
- Payload: `{"id":46,"title":"POI 1","title_is_visible":true,"author":1,"creation_date":"2022-01-26T15:13:20.262Z","biovers":1,"radius":15.5,"style_type":"sphere","style_stroke":true,"style_stroke_width":1.2,"style_fill":false,"style_elevation":16.4,"style_elevation_ground":32.4,"style_noise":22.3,"style_is_visible":true,"visible_from":455.5,"trigger_mode":"location","coordinate":{"long":12.2,"lat":13.3,"alt":14.4,"creation_date":"2022-01-26T15:13:20.262Z"}}`
- Example: `/poi/update`
- Return: `{"id":46,"title":"POI 1","title_is_visible":true,"subtitle":null,"subtitle_is_visible":false,"author":1,"creation_date":"2022-01-26T15:13:20.478Z","update_date":"2022-01-26T15:13:20.478Z","deleted_date":null,"last_contributor":1,"is_public":true,"is_editable":false,"biovers":1,"radius":15.5,"style_type":"sphere","style_stroke":true,"style_stroke_width":1.2,"style_fill":false,"style_elevation":16.4,"style_elevation_ground":32.4,"style_noise":22.3,"style_is_visible":true,"visible_from":455.5,"trigger_mode":"location","metadata":null}`

### POI Deletion

- HTTP method: POST
- Route: /poi/delete
- Payload: `{"id":1,"title":"POI 1","title_is_visible":true,"subtitle":null,"subtitle_is_visible":false,"author":1,"creation_date":"2022-01-24T15:13:20.478Z","update_date":"2022-01-25T15:13:20.478Z","deleted_date":"2022-01-26T15:13:20.478Z","last_contributor":1,"is_public":true,"is_editable":false,"biovers":1,"radius":15.5,"style_type":"sphere","style_stroke":true,"style_stroke_width":1.2,"style_fill":false,"style_elevation":16.4,"style_elevation_ground":32.4,"style_noise":22.3,"style_is_visible":true,"visible_from":455.5,"trigger_mode":"location","metadata":null}`
- Example: `/poi/delete`
- Return: `{"id":1,"title":"POI 1","title_is_visible":true,"subtitle":null,"subtitle_is_visible":false,"author":1,"creation_date":"2022-01-24T15:13:20.478Z","update_date":"2022-01-25T15:13:20.478Z","deleted_date":"2022-01-26T15:13:20.478Z","last_contributor":1,"is_public":true,"is_editable":false,"biovers":1,"radius":15.5,"style_type":"sphere","style_stroke":true,"style_stroke_width":1.2,"style_fill":false,"style_elevation":16.4,"style_elevation_ground":32.4,"style_noise":22.3,"style_is_visible":true,"visible_from":455.5,"trigger_mode":"location","metadata":null}`

## PATH

### PATH Creation

- HTTP method: POST
- Route: /path/create
- Payload: `{"author":1,"creation_date":"2022-01-31T09:34:18.415Z","biovers":1,"style_type":"sphere","style_stroke":true,"style_stroke_width":1.2,"style_elevation":16.4,"style_elevation_ground":32.4,"style_noise":22.3,"style_is_visible":true,"visible_from":455.5,"coordinate":[{"long":12.2,"lat":13.3,"alt":14.4,"creation_date":"2022-01-31T09:34:18.415Z"},{"long":12.2,"lat":13.3,"alt":14.4,"creation_date":"2022-01-31T09:34:18.415Z"}]}`
- Example: `/path/create`
- Return: `{"id":29,"author":1,"creation_date":"2022-01-31T09:34:18.526Z","update_date":null,"deleted_date":null,"last_contributor":1,"is_public":true,"is_editable":false,"biovers":1,"style_type":"sphere","style_stroke":true,"style_stroke_width":1.2,"style_elevation":16.4,"style_elevation_ground":32.4,"style_noise":22.3,"style_is_visible":true,"visible_from":455.5,"metadata":null,"coordinate":[{"id":185,"long":12.2,"lat":13.3,"alt":14.4,"creation_date":"2022-01-31T09:34:18.526Z","update_date":null,"deleted_date":null,"poi_id":null,"path_id":29},{"id":186,"long":12.2,"lat":13.3,"alt":14.4,"creation_date":"2022-01-31T09:34:18.526Z","update_date":null,"deleted_date":null,"poi_id":null,"path_id":29}]}`

### PATH Update

- HTTP method: POST
- Route: /pah/update
- Payload: `{"id":1,"author":1,"creation_date":"2022-01-31T09:35:26.799Z","update_date":null,"deleted_date":null,"last_contributor":null,"is_public":true,"is_editable":false,"biovers":1,"style_type":"sphere","style_stroke":true,"style_stroke_width":1.2,"style_elevation":16.4,"style_elevation_ground":32.4,"style_noise":22.3,"style_is_visible":true,"visible_from":455.5,"metadata":"This is a test","coordinate":[{"id":200,"long":12.2,"lat":13.3,"alt":999.99,"creation_date":"2022-01-31T09:35:26.643Z","update_date":null,"deleted_date":null,"poi_id":null,"path_id":1},{"id":201,"long":12.2,"lat":13.3,"alt":14.4,"creation_date":"2022-01-31T09:35:26.643Z","update_date":null,"deleted_date":null,"poi_id":null,"path_id":1}]}`
- Example: `/path/update`
- Return: `{"id":1,"author":1,"creation_date":"2022-01-31T09:35:26.799Z","update_date":"2022-01-31T09:35:26.815Z","deleted_date":null,"last_contributor":1,"is_public":true,"is_editable":false,"biovers":1,"style_type":"sphere","style_stroke":true,"style_stroke_width":1.2,"style_elevation":16.4,"style_elevation_ground":32.4,"style_noise":22.3,"style_is_visible":true,"visible_from":455.5,"metadata":"This is a test","coordinate":[{"id":200,"long":12.2,"lat":13.3,"alt":999.99,"creation_date":"2022-01-31T09:35:26.643Z","update_date":"2022-01-31T09:35:26.808Z","deleted_date":null,"poi_id":null,"path_id":1},{"id":201,"long":12.2,"lat":13.3,"alt":14.4,"creation_date":"2022-01-31T09:35:26.643Z","update_date":"2022-01-31T09:35:26.812Z","deleted_date":null,"poi_id":null,"path_id":1}]}`

### PATH Deletion

- HTTP method: POST
- Route: /path/delete
- Payload: `{"id":1,"author":1,"creation_date":"2022-01-31T09:36:25.697Z","update_date":null,"deleted_date":null,"last_contributor":null,"is_public":true,"is_editable":false,"biovers":1,"style_type":"sphere","style_stroke":true,"style_stroke_width":1.2,"style_elevation":16.4,"style_elevation_ground":32.4,"style_noise":22.3,"style_is_visible":true,"visible_from":455.5,"metadata":null,"coordinate":[{"id":219,"long":12.2,"lat":13.3,"alt":14.4,"creation_date":"2022-01-31T09:36:25.494Z","update_date":null,"deleted_date":null,"poi_id":null,"path_id":1},{"id":220,"long":12.2,"lat":13.3,"alt":14.4,"creation_date":"2022-01-31T09:36:25.494Z","update_date":null,"deleted_date":null,"poi_id":null,"path_id":1}]}`
- Example: `/path/delete`
- Return: `{"id":1,"author":1,"creation_date":"2022-01-31T09:36:25.697Z","update_date":null,"deleted_date":"2022-01-31T09:36:25.706Z","last_contributor":null,"is_public":true,"is_editable":false,"biovers":1,"style_type":"sphere","style_stroke":true,"style_stroke_width":1.2,"style_elevation":16.4,"style_elevation_ground":32.4,"style_noise":22.3,"style_is_visible":true,"visible_from":455.5,"metadata":null,"coordinate":[{"id":219,"long":12.2,"lat":13.3,"alt":14.4,"creation_date":"2022-01-31T09:36:25.494Z","update_date":null,"deleted_date":"2022-01-31T09:36:25.706Z","poi_id":null,"path_id":1},{"id":220,"long":12.2,"lat":13.3,"alt":14.4,"creation_date":"2022-01-31T09:36:25.494Z","update_date":null,"deleted_date":"2022-01-31T09:36:25.706Z","poi_id":null,"path_id":1}]}`
