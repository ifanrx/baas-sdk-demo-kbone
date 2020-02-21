import BaaS from 'baas'
import {tableName} from './config'

export const getBooks = (uid, cb) => {
  let Books = new BaaS.TableObject(tableName)
  let query = new BaaS.Query()

  query.compare('created_by', '=', uid)
  Books.setQuery(query).find()
    .then(res => cb(res))
    .catch(err => console.dir(err))
}

export const addBook = (bookName, cb) => {
  let Books = new BaaS.TableObject(tableName)
  let Book = Books.create()
  let data = {
    bookName,
  }
  Book.set(data)
    .save()
    .then(res => cb(res))
    .catch(err => console.dir(err))

}

export const updateBook = (id, bookName, cb) => {
  let Books = new BaaS.TableObject(tableName),
    Book = Books.getWithoutData(id)

  let data = {
    bookName
  }

  Book.set(data)
    .update()
    .then(res => cb(res))
    .catch(err => console.dir(err))
}

export const deleteBook = (id, cb) => {
  let Books = new BaaS.TableObject(tableName)
  Books.delete(id)
    .then(res => cb(res))
    .catch(err => console.dir(err))
}
