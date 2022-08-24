L'API de REST Gym devra

- gérer des utilisateurs
- gérer l'occupation d'une machine par un utilisateur
- obtenirs des détails sur des machines (occupation, muscles ciblés, date mise en service, etc)

Requêtes liées aux utilisateurs

- GET /users
- GET /users/:userId
- POST /users
- PUT /users/:userId
- DELETE /users/:userId

Requêtes liées aux machines

- GET /machines
- GET /machines/machine:Id
- POST /machines
- PUT /machines/:machineId
- DELETE /machines/:machineId

Une machine aura pour éléments

- id : number
- name : string
- manufacturer : string
- muscle_name : string
- max_weight : number
- broken : boolean
- is_occupied : boolean
- occupant_id : number
- occupant_name : string

Afin d'obtenir des valuers correctes, il faudra vérifier que :
- tous les paramètres requis devront être remplis
- les paramètres de type string ne devront pas contenir de chiffres
- les paramètres de type number devront uniquement contenir un nombre
