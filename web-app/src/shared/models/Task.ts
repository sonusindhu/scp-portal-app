export interface Task {
    companyId: number,
    pointOfContact: number,
    createdAt: number,
    id: number,
    inventoryId: number,
    isCritical: boolean,
    description: string,
    quoteId: number,
    subject: string,
    type: string
    updatedAt: number,
    userId: number
}