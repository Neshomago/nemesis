export class viewTicketdata{
    address: string;​
    agencyId: string;​​
    certification: string;
    code: string;
    createdBy: string;
    creationDate: Date;
    // customerId: "CUSTOME581785f34f4f3"​​
    description: string;
    email: string;
    // fechaTraza: "Fri, 22 Jan 2021 16:39:16 GMT"​​
    id: number;​​
    isDelete: number;​​
    managerId: string;
    // moreInfo: "tonibarra@libero.it;\n\n - ip address: CAMPANIA\n - Managed by: \n - quality V2: NB"​​
    name: string;
    phone: string;​​
    priority: string;​​
    status: string;​
    type: string;

    constructor(ticketcomplete: any){
        this.id = ticketcomplete.id;
        this.code = ticketcomplete.code;
        this.creationDate = ticketcomplete.creationDate;
        this.createdBy = ticketcomplete.createdBy;
        this.type = ticketcomplete.type;
        this.priority = ticketcomplete.priority;
        this.agencyId = ticketcomplete.agencyId;
        this.name = ticketcomplete.name;
        this.managerId = ticketcomplete.managerId;
        this.certification = ticketcomplete.certification;
        this.address = ticketcomplete.address;
        this.phone = ticketcomplete.phone;
        this.email = ticketcomplete.email;
        this.status = ticketcomplete.status;
        this.description = ticketcomplete.description;
        // this.moreInfo = ticketcomplete.moreInfo;
        this.isDelete = ticketcomplete.isDelete;
    }
}