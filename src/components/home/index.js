import React, { useState, useEffect, useCallback } from 'react'
import {getBooks, addBook, deleteBook, updateBook} from '../../utils'
import BaaS from 'baas'
import avatar from '../../images/avatar.png'
import './index.css'

function Home() {
  const title = '我的书籍'
  const [bookName, setBookName] = useState('')
  const [profile, setProfile] = useState({})
  const [bookList, setBookList] = useState([])
  useEffect(() => {
    BaaS.auth.login({
      username: 'abc',
      password: '123',
    }).then(user => {
      setProfile(user.toJSON())
      fetchBookList(user.id)
    })
  }, [])
  const fetchBookList = useCallback(id => {
    getBooks(id || profile.id, (res) => {
      setBookList(res.data.objects)
    })
  })
  const handleBookNameChange = useCallback((e) => {
    setBookName(e.target.value)
  }, [])
  const createBook = useCallback(() => {
    addBook(bookName, () => {
      setBookName('')
      fetchBookList()
    })
  }, [bookName])
  const removeBook = useCallback(id => {
    deleteBook(id, () => {
      fetchBookList()
    })
  }, [profile.id])

  const editBookButtonClick = useCallback(index => {
    const book = bookList[index]
    if (book.isEditing) {
      updateBook(book.id, book.bookName, () => {
        fetchBookList()
      })
    } else {
      const newBookList = [].concat(bookList)
      newBookList[index].isEditing = true
      setBookList(newBookList)
    }
  }, [bookList])

  const handleUpdateBookName = useCallback((index, bookName) => {
    const newBookList = [].concat(bookList)
    newBookList[index].bookName = bookName
    setBookList(newBookList)
  }, [bookList])

  return (
    <div className="index">
      <div className="index-profile">
        { process.env.isMiniprogram ? (
          <wx-open-data type="userAvatarUrl" className="index-profile__img"></wx-open-data>
        ): (
          <img type="userAvatarUrl" className="index-profile__img" src={avatar} />
        )}
      </div>
      <div className="index-title">
        {title}
      </div>
      <div className="index-books">
        <div className="index-books__showLayer">
        {bookList.map((item, index) => (
          <div className="index-books__item" key="{index}">
            <div className="index-books__title">书目：</div>
            {!item.isEditing ? (
              <div className="index-books__controls--show">{item.bookName}</div>
            ): (
              <div className="index-books__controls--edit-area">
               <input
                  type="text"
                  value={item.bookName}
                  confirm-type="完成"
                  data-book-id={item.id}
                  onChange={e => handleUpdateBookName(index, e.target.value)}
                />
              </div>
            )}
            <button
              className="index-books__controls--edit-btn btn"
              type="primary"
              data-book-id="{{ item.id }}"
              data-index="{{index}}"
              onClick={() => editBookButtonClick(index)}
            >
            {item.isEditing ? '保存' : '编辑'}
            </button>
            <button
              className="index-books__controls--delete btn"
              type="warn"
              data-book-id="{{ item.id }}"
              onClick={() => removeBook(item.id)}
            >
              删除
            </button>
          </div>
        ))}
        </div>

        <div className="index-books__input">
          <input
            type="text"
            placeholder="我的床头书"
            value={bookName}
            confirm-type="完成"
            onChange={handleBookNameChange}
            bindinput="bindCreateBookNameInput"
          />
        </div>
        <div className="index-books__controls">
          <button
            className="index-books__controls--create"
            onClick={createBook}
            type="primary"
          >
            添加
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
