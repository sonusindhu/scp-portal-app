export interface EmailListProps{
    emails: Email[]
}

export interface EmailFormProps {
    id?: number,
    email: Partial<Email>,
    onSuccess: Function
  }

export interface Email {
    companyId: number,
    contactId: number,
    createdAt: number,
    id?: number,
    inventoryId: number,
    isCritical: boolean,
    message: string,
    quoteId: number,
    title: string,
    type: string
    updatedAt: number,
    userId: number
}