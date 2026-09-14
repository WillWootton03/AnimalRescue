from pydantic import BaseModel

class NewPet(BaseModel):
    name: str
    shelter_id: str
    type: str
    breed: str
    age: int
    adoption_price: int