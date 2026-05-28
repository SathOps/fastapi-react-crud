import {useEffect,useState} from "react"
import axios from "axios"
import "./App.css"

function App(){

  const[posts,setPosts]=useState([])
  const[username,setUsername]=useState("")
  const[content,setContent]=useState("")
  const[editingId,setEditingId]=useState(null)
  const[darkMode,setDarkMode]=useState(true)

  const fetchPosts=async()=>{
    const res=await axios.get("http://127.0.0.1:8000/posts")
    setPosts(res.data.reverse())
  }

  useEffect(()=>{
    fetchPosts()
  },[])

  const createPost=async()=>{

    if(!username || !content)return

    await axios.post("http://127.0.0.1:8000/posts",{
      username,
      content
    })

    setUsername("")
    setContent("")

    fetchPosts()
  }

  const likePost=async(id)=>{
    await axios.put(`http://127.0.0.1:8000/posts/${id}/like`)
    fetchPosts()
  }

  const deletePost=async(id)=>{
    await axios.delete(`http://127.0.0.1:8000/posts/${id}`)
    fetchPosts()
  }

  const startEdit=(post)=>{
    setEditingId(post.id)
    setUsername(post.username)
    setContent(post.content)
  }

  const saveEdit=async()=>{

    await axios.put(`http://127.0.0.1:8000/posts/${editingId}`,{
      username,
      content
    })

    setEditingId(null)
    setUsername("")
    setContent("")

    fetchPosts()
  }

  return(
    <div className={darkMode?"app":"app light"}>

      <div className="feed-container">

        <div className="navbar">
          <h1 className="logo">Sathwik's Social Feed</h1>

          <button
            className="theme-btn"
            onClick={()=>setDarkMode(!darkMode)}
          >
            {darkMode?"Light Mode":"Dark Mode"}
          </button>
        </div>

        <div className="create-card">

          <h2>
            {editingId?"Edit Post":"Create Post"}
          </h2>

          <input
            placeholder="Username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
          />

          <textarea
            placeholder="What's happening?"
            value={content}
            onChange={(e)=>setContent(e.target.value)}
          />

          {
            editingId?
            <button onClick={saveEdit}>
              Save Edit
            </button>
            :
            <button onClick={createPost}>
              Post
            </button>
          }

        </div>

        <div className="posts-section">

          {
            posts.map(post=>(

              <div
                className="post-card"
                key={post.id}
              >

                <div className="post-top">

                  <div className="avatar">
                    {post.username.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h3>{post.username}</h3>

                    <p className="username">
                      @{post.username}
                    </p>
                  </div>

                </div>

                <p className="content">
                  {post.content}
                </p>

                <p>
                  ❤️ {post.likes}
                </p>

                <div className="post-actions">

                  <button onClick={()=>likePost(post.id)}>
                    Like
                  </button>

                  <button onClick={()=>startEdit(post)}>
                    Edit
                  </button>

                  <button onClick={()=>deletePost(post.id)}>
                    Delete
                  </button>

                </div>

              </div>

            ))
          }

        </div>

      </div>

    </div>
  )
}

export default App