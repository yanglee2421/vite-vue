enum Gender { unknown = 0, men = 1, women = 2 }
interface tableItem {
    name: string
    age: number
    gender: Gender
}
class Table {
    private data: tableItem[] = []
    get rows() {
        return this.data
    }
    set rows(value) {
        this.data = value
    }
}