from fastapi import FastAPI,Depends
from sqlalchemy.orm import Session
from database import SessionLocal,engine,Base
from models import Post
from schemas import PostCreate,PostResponse
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/posts",response_model=PostResponse)
def create_post(post:PostCreate,db:Session=Depends(get_db)):
    new_post=Post(
        username=post.username,
        content=post.content
    )

    db.add(new_post)
    db.commit()
    db.refresh(new_post)

    return new_post

@app.get("/posts",response_model=list[PostResponse])
def get_posts(db:Session=Depends(get_db)):
    return db.query(Post).all()

@app.put("/posts/{post_id}")
def edit_post(post_id:int,post:PostCreate,db:Session=Depends(get_db)):
    existing_post=db.query(Post).filter(Post.id==post_id).first()

    existing_post.username=post.username
    existing_post.content=post.content

    db.commit()

    return {"message":"Post updated"}

@app.put("/posts/{post_id}/like")
def like_post(post_id:int,db:Session=Depends(get_db)):
    post=db.query(Post).filter(Post.id==post_id).first()

    post.likes+=1

    db.commit()

    return {"message":"Post liked"}

@app.delete("/posts/{post_id}")
def delete_post(post_id:int,db:Session=Depends(get_db)):
    post=db.query(Post).filter(Post.id==post_id).first()

    db.delete(post)
    db.commit()

    return {"message":"Post deleted"}