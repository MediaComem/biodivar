# API:

## Users

### User Creation

- HTTP method: POST
- Route: /user/create
- Query Parameter: `user={"username": "user", "email": "email", "password": "password"}`
- Example: `/user/create?user={"username": "user", "email": "email", "password": "password"}`
- Return: `{"id": id, "username": "user", "email": "email", "password": "password", "creation_date": "date", "udpate_date": "null", "deleted_date": "null"}`

### User Update

- HTTP method: POST
- Route: /user/update
- Query Parameter: `user={"username": "user", "email": "email", "password": "password"}`
- Example: `/user/update?user={"username": "user", "email": "email", "password": "password"}`
- Return: `{"id": id, "username": "user", "email": "email", "password": "password", "creation_date": "date", "udpate_date": "date", "deleted_date": "null"}`

### User Deletion

- HTTP method: POST
- Route: /user/delete
- Query Parameter: `id=1`
- Example: `/user/delete?id=1`
- Return: `{"id": id, "username": "user", "email": "email", "password": "password", "creation_date": "date", "udpate_date": "date", "deleted_date": "date"}`

## Biovers

### Get All public Biovers

- HTTP method: GET
- Route: /biovers
- Example: `/biovers`
- Return: `[{"id":1,"name":"name","owner":id,"creation_date":"date","update_date":null,"deleted_date":null,"is_public":true,"Poi":[{"id":1,"title":"POI 1","title_is_visible":true,"subtitle":null,"subtitle_is_visible":false,"autor":1,"creation_date":"2022-01-26T13:43:01.892Z","update_date":null,"deleted_date":null,"last_contributor":null,"is_public":true,"is_editable":false,"biovers":1,"radius":15.5,"style_type":"sphere","style_stroke":true,"style_stroke_width":1.2,"style_fill":false,"style_elevation":16.4,"style_elevation_ground":32.4,"style_noise":22.3,"style_is_visible":true,"visible_from":455.5,"trigger_mode":"location","metadata":null,"coordinate":null},{"id":2,"title":"POI 1","title_is_visible":true,"subtitle":null,"subtitle_is_visible":false,"autor":1,"creation_date":"2022-01-26T13:43:01.892Z","update_date":null,"deleted_date":null,"last_contributor":null,"is_public":true,"is_editable":false,"biovers":1,"radius":15.5,"style_type":"sphere","style_stroke":true,"style_stroke_width":1.2,"style_fill":false,"style_elevation":16.4,"style_elevation_ground":32.4,"style_noise":22.3,"style_is_visible":true,"visible_from":455.5,"trigger_mode":"location","metadata":null,"coordinate":null}]`

### Get all biovers of a dedicated user

- HTTP method: GET
- Route: /biovers/user
- Query Parameter: `id=id`
- Example: `/biovers/user?id=1`
- Return: `[{"id":1,"name":"Biovers 1","owner":1,"creation_date":"2022-01-26T13:43:02.007Z","update_date":null,"deleted_date":null,"is_public":true,"Poi":[{"id":1,"title":"POI 1","title_is_visible":true,"subtitle":null,"subtitle_is_visible":false,"autor":1,"creation_date":"2022-01-26T13:43:01.892Z","update_date":null,"deleted_date":null,"last_contributor":null,"is_public":true,"is_editable":false,"biovers":1,"radius":15.5,"style_type":"sphere","style_stroke":true,"style_stroke_width":1.2,"style_fill":false,"style_elevation":16.4,"style_elevation_ground":32.4,"style_noise":22.3,"style_is_visible":true,"visible_from":455.5,"trigger_mode":"location","metadata":null,"coordinate":null},{"id":2,"title":"POI 1","title_is_visible":true,"subtitle":null,"subtitle_is_visible":false,"autor":1,"creation_date":"2022-01-26T13:43:01.892Z","update_date":null,"deleted_date":null,"last_contributor":null,"is_public":true,"is_editable":false,"biovers":1,"radius":15.5,"style_type":"sphere","style_stroke":true,"style_stroke_width":1.2,"style_fill":false,"style_elevation":16.4,"style_elevation_ground":32.4,"style_noise":22.3,"style_is_visible":true,"visible_from":455.5,"trigger_mode":"location","metadata":null,"coordinate":null},{"id":3,"title":"POI 1","title_is_visible":true,"subtitle":null,"subtitle_is_visible":false,"autor":1,"creation_date":"2022-01-26T13:43:02.026Z","update_date":null,"deleted_date":null,"last_contributor":1,"is_public":true,"is_editable":false,"biovers":1,"radius":15.5,"style_type":"sphere","style_stroke":true,"style_stroke_width":1.2,"style_fill":false,"style_elevation":16.4,"style_elevation_ground":32.4,"style_noise":22.3,"style_is_visible":true,"visible_from":455.5,"trigger_mode":"location","metadata":null,"coordinate":null}]},{"id":3,"name":"Biovers 3","owner":1,"creation_date":"2022-01-26T13:43:02.012Z","update_date":null,"deleted_date":null,"is_public":false,"Poi":[]}]`