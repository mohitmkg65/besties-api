Create Project
----------------
npm init -y
npm i --save-dev typescript
npm i --save-dev ts-node
npm i --save-dev @types/node
npm i express
npm i --save-dev @types/express
npm i mongoose
npm i dotenv
npm i nodemon
npm i cors
create tsconfig.json file and paste the following content
{
    "compilerOptions": {
        "target": "ES2020",
        "module": "CommonJS",
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true,
        "outDir": "./dist"
    },
    "include": ["src"],
    "exclude": ["node_modules"]
}

During development
------------------
npm i --save-dev @types/cors

Steps or flow to start the code from
-------------------------------------
Model 
Controller
Routes
index or root

import model in Controller
import controller in Routes
import routes in index or root
--------------------------------

npm i bcrypt
npm i --save-dev @types/bcrypt
npm i jsonwebtoken
npm i --save-dev @types/jsonwebtoken
npm i cookie-parser
npm i --save-dev @types/cookie-parser