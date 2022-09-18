export default interface RepairInterface {
    id: string
    mobilePhoneNumber: string
    name: string
    phoneNumber: string
    address: string
    registrationDate: string
    repairReport: Array<RepairReportInterface> | undefined
}

export interface RepairReportInterface {
    content: string
    date: string
}
