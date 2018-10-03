// ADATMODELL LÉTREHOZÁSA:

export class User {  //Az osztály létrehozásával a tervrajz más modulokban is felhasználható
    id: number;
    lastName: string;
    firstName: string;
    email: string;
    phone: string;
    relatives?: string;  //?- nem kötelező kitölteni
    active?: boolean;

    public constructor(
        id: number = 1,
        lastName: string ="",
        firstName: string ="",
        email: string ="",
        phone: string ="",
        relatives: string = 'none',
        active: boolean = false
    ) {
        this.id = id;
        this.lastName = lastName;
        this.firstName = firstName;
        this.email = email;
        this.phone = phone;
        this.relatives = relatives;
        this.active = active
    }

    formObject(obj) {                   //egy objektum alapján feltölti a usert
        for (let k in obj) {
            this[k] = obj[k];
            //console.log(k,'-', this[k]);
            }
        }
    }

}
