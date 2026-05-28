from pydantic import BaseModel

class PostCreate(BaseModel):
    username:str
    content:str

class PostResponse(BaseModel):
    id:int
    username:str
    content:str
    likes:int

    class Config:
        from_attributes=True