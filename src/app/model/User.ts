// ADATMODELL LÉTREHOZÁSA:

export class User {  //Az osztály létrehozásával a tervrajz más modulokban is felhasználható
    id: number;
    lastName: string;
    firstName: string;
    email: string;
    phone: string;
    relatives?: string  //?- nem kötelező kitölteni

    public constructor (    
        id: number,
        lastName: string,
        firstName: string,
        email: string,
        phone: string,
        relatives: string = 'none'
        )
    {
        this.id = id;
        this.lastName = lastName;
        this.firstName = firstName;
        this.email = email;
        this.phone = phone;
        this.relatives = relatives;
    }
}