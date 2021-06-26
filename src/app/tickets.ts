export interface Tickets {
    
 createdBy:string;
 type:string;
 customerId:string;
 status:string;
 priority:string;
 agencyId:string;
 description:string;
 ids:string;
 version:number;
 code:string;
 tech_assing?:string;
 assigned_tags?:string;
 assignedDate?: Date;
 closedDate?: Date;
 id?:number;
}

export interface Ticket_equipment
{
    item: any;
    quantity: any;
    ticketId: any;
    version:number | undefined;
    createdBy?:string;
    type?:string;
    status?:string;
    priority?:string;
    agencyId?:string;
    description?:string;
    ids?:string;
    code?:string;
    tech_assing?:string;
    assigned_tags?:string;
    assignedDate?: any;
    closedDate?: any;
    id?:number;
}

export interface Ticket_update{
    status:string;
    description:string;
    tech_assign?:string;
    assigned_tags?:string;
    assignedDate?: Date;
    //closedDate?: Date;
}

export interface ItemWarehouse {
    name: string;
    description: string;
    serial: string;
    supplier: string;
    status: string;
    warrantyPeriod: number;
    categoryId:number;
    isMoving: number;
    isDeleted: number;
    warehouseId: number;
    isUsed: number;
    invoice_purchase: string;
    warranty_invoiceDate?: string;
    agencyId?: number;
    statusDetails?:string;
    technicianNotes?: string;
    vehicle_Id?: number;
    technicianId?: number;
    technicianAssigned?: string;
    customerId?: number;
    userId?: number;
    activationCode?: string;
    registerDate?: Date;
    dateofArrive?: Date;
    dateofRemoval?: Date;
}