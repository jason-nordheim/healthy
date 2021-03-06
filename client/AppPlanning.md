# Document for Planning

## Features

1. Accounts
   1. Authentication
      1. Accounts Modeled in MongoDB
      2. Password hashed and stored as `password_digest`
2. Calculators
   1. BMI Calculator
   2. Incline Calculator
3. Graphs
   1. BMI (Trend over time)
      1. Current
      2. Low
      3. High
      4. Trend over time
   2. Weight
      1. Current
      2. Low
      3. High
      4. Trend over time
   3. Activities
      1. per month (average)
      2. per week (average)
      3. per day (average)
      4. longest

## Data Models

Below is the data models associated with this project in JSON format. Data will be stored using MongoDB, and Mongoose as the ORM.

### Presenting the Data Models

The root keys below are the names of the associated model (e.g. `"user"`, `"weight"`, etc.).

- All models will have `"description"` and `"properties"`.

The `"properties"` key is associated with an object defining the distinct properties associated with each data model.

- `type` defines the MongoDB data type
- `description` provides context to the property
- `required` defines if the field will be required
- `defaultTo` defines if the field will default to a certain value
- `visibility` defines who can see the property
  - `hidden` indicates the property will not be visible to end-user
  - `private` indicates the property will only be visible to the associated user
  - `public` indicates the property will be visible to any user
  - `configurable` indicates the property can be toggled between `public`, `private`, and `connections`

### Data Model Definitions

```json
{
  "user": {
    "description": "User account information",
    "notes": [
      "`full name` is not stored, but can be derived from first and last name",
      "height is stored as part of the user object since height should remain constant over time"
    ],
    "properties": {
      "_id": {
        "type": "ObjectID",
        "description": "Unique record identifier",
        "required": true,
        "unique": true,
        "defaultTo": "auto-generated",
        "visibility": "hidden"
      },
      "first": {
        "type": "String",
        "description": "First name of end-user",
        "required": true,
        "unique": false,
        "defaultTo": "N/A",
        "visibility": "configurable"
      },
      "last": {
        "type": "String",
        "description": "Last name (family name) of end-user",
        "required": true,
        "unique": false,
        "defaultTo": "N/A",
        "visibility": "configurable"
      },
      "email": {
        "type": "String",
        "description": "Email address of end-user",
        "required": true,
        "unique": true,
        "defaultTo": "",
        "visibility": "private"
      },
      "username": {
        "type": "String",
        "description": "public username of user",
        "required": true,
        "unique": false,
        "defaultTo": null,
        "visibility": "public"
      },
      "height": {
        "type": "Number",
        "description": "Height of user in centimeters",
        "required": false,
        "unique": false,
        "defaultTo": "N/A",
        "visibility": "private"
      },
      "day": {
        "type": "Number",
        "description": "Birth day",
        "required": true,
        "unique": false,
        "defaultTo": "N/A",
        "visibility": "private"
      },
      "month": {
        "type": "Number",
        "description": "Birth month",
        "required": true,
        "unique": false,
        "defaultTo": "N/A",
        "visibility": "private"
      },
      "year": {
        "type": "Number",
        "description": "Birth year",
        "required": true,
        "unique": false,
        "defaultTo": "N/A",
        "visibility": "private"
      },
      "password_digest": {
        "type": "String",
        "description": "Hashed password",
        "required": true,
        "unique": false,
        "defaultTo": "N/A",
        "visibility": "hidden"
      },
      "createdAt": {
        "type": "Timestamp",
        "description": "Timestamp of record creation",
        "required": true,
        "unique": true,
        "defaultTo": "time of document creation",
        "visibility": "hidden"
      }
    }
  },
  "weight": {
    "description": "records of weight",
    "notes": [
      "weight will always be recorded in metric values (kg) to make related calculations simpler"
    ],
    "properties": {
      "_id": {
        "type": "ObjectID",
        "description": "Unique record identifier",
        "required": true,
        "unique": true,
        "defaultTo": "auto-generated",
        "visibility": "hidden"
      },
      "userId": {
        "type": "ObjectID",
        "description": "links to associated user object",
        "required": true,
        "unique": false,
        "defaultTo": "current user",
        "visibility": "private"
      },
      "kg": {
        "type": "Number",
        "description": "Weight in Kilograms",
        "required": false,
        "unique": false,
        "defaultTo": "N/A",
        "visibility": "private"
      },
      "createdAt": {
        "type": "Timestamp",
        "description": "Timestamp of record creation",
        "required": true,
        "unique": true,
        "defaultTo": "time of document creation",
        "visibility": "hidden"
      }
    }
  },
  "activity": {
    "description": "Run, bike, or other activity",
    "visibility": "configurable",
    "notes": [
      "activity duration is not recorded but can be calculated using the start/end properties"
    ],
    "properties": {
      "_id": {
        "type": "ObjectID",
        "description": "Unique record identifier",
        "required": true,
        "unique": true,
        "defaultTo": "auto-generated",
        "visibility": "hidden"
      },
      "name": {
        "type": "String",
        "description": "user-defined activity name",
        "required": false,
        "unique": false,
        "defaultTo": "<Time of Day> Activity <location>",
        "visibility": "configurable"
      },
      "location": {
        "type": "Object/Document",
        "visibility": "configurable",
        "name": {
          "type": "String",
          "description": "User defined name of the location where the activity took place",
          "required": false,
          "defaultTo": null,
          "visibility": "configurable"
        },
        "latitude": {
          "type": "Number",
          "description": "latitude position of activity",
          "required": false,
          "defaultTo": null,
          "visibility": "configurable"
        },
        "longitude": {
          "type": "Number",
          "description": "latitude position of activity",
          "required": false,
          "defaultTo": null,
          "visibility": "configurable"
        }
      },
      "calories": {
        "type": "Number",
        "description": "Number of calories expended during the activity",
        "required": false,
        "defaultTo": null,
        "visibility": "configurable"
      },
      "distance": {
        "type": "Number",
        "description": "Distance covered in kilometers (km)",
        "required": false,
        "defaultTo": null,
        "visibility": "configurable"
      },
      "elevation": {
        "type": "object/document",
        "description": "Object containing attributes defining the distance associated with the activity",
        "start": {
          "type": "Number",
          "description": "elevation at the start of the activity in meters above sea level",
          "required": false,
          "defaultTo": null
        },
        "end": {
          "type": "Number",
          "description": "elevation at the end of the activity in meters above sea level",
          "required": false,
          "defaultTo": null
        }
      },
      "category": {
        "type": "String",
        "description": "Category type. Defined by user",
        "required": false,
        "defaultTo": null
      },
      "startedAt": {
        "type": "DateTime",
        "description": "Day & time the activity was started",
        "required": false,
        "defaultTo": null
      },
      "completedAt": {
        "type": "DateTime",
        "description": "Day & time the activity was started",
        "required": false,
        "defaultTo": null
      },
      "heartRate": {
        "type": "object/document",
        "description": "Object describing user's heart rate during activity",
        "required": false,
        "properties": {
          "average": {
            "type": "Number",
            "description": "Average heart rate recorded during activity",
            "required": false,
            "defaultTo": null
          },
          "minimum": {
            "type": "Number",
            "description": "Lowest heart rate recorded during activity",
            "required": false,
            "defaultTo": null
          },
          "maximum": {
            "type": "Number",
            "description": "highest heart rate recorded during activity",
            "required": false,
            "defaultTo": null
          }
        }
      },
      "notes": {
        "type": "String",
        "description": "Optional field for users to record notes about an activity",
        "required": false,
        "defaultTo": null,
        "visibility": "private"
      },
      "public": {
        "type": "Boolean",
        "description": "Toggle enabling user to choose if an activity should be public/private",
        "required": true,
        "defaultTo": false,
        "visibility": "private"
      },
      "createdAt": {
        "type": "Timestamp",
        "description": "Timestamp of record creation",
        "required": true,
        "unique": true,
        "defaultTo": "time of document creation",
        "visibility": "hidden"
      }
    }
  }
}
```
