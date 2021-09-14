import mongoose from 'mongoose';

export class DatabaseConfig {
    
    private username!: string;
    private password!: string;
    private static instance: DatabaseConfig;

    constructor() {
        this.username = process.env.DB_USER as string;
        this.password = process.env.DB_PASSWORD as string;

        this.connect = this.connect.bind(this);
    }

    public static getInstance(): DatabaseConfig {
        if(!DatabaseConfig.instance)
        DatabaseConfig.instance = new DatabaseConfig();

        return DatabaseConfig.instance;
    }

    public async connect() {
        try {
            console.log(`mongodb://${this.username}:${this.password}@pokedex_db`);
            await mongoose.connect(`mongodb://${this.username}:${this.password}@pokedex_db`, { 
                useNewUrlParser: true, 
                useUnifiedTopology: true }
            )
;
            console.log(`API Connexion to database : ${mongoose.connection.readyState === 1 ? 'Connected': 'Disconnected'}`);
        }
        catch(error) {
            console.error(error);
        }
    }
}
