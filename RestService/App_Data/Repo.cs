using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Formatters.Binary;

public class Repo
{
    private IList<Car> Cars { get; set; }

    public Repo()
    {
        this.Cars = new List<Car>();
        LoadData();
    }

    public void LoadData()
    {
        this.Cars.Add(new Car()
        {
            ID = 1,
            Color = "Red",
            Make = "Toyota",
            Model = "Celica",
            Year = DateTime.Now 
        });
        this.Cars.Add(new Car()
        {
            ID = 2,
            Color = "Blue",
            Make = "Nissan",
            Model = "Sentra",
            Year = DateTime.Now
        });
        this.Cars.Add(new Car()
        {
            ID = 3,
            Color = "Silver",
            Make = "BMW",
            Model = "325i",
            Year = DateTime.Now
        });
        this.Cars.Add(new Car()
        {
            ID = 4,
            Color = "Black",
            Make = "Ford",
            Model = "F-150",
            Year = DateTime.Now
        });
        SaveCars();
    }

    private void SaveCars()
    {
        var formatter = new BinaryFormatter();
        using (var stream = new FileStream("./CarFile.dat", FileMode.Create, FileAccess.Write))
        {
            formatter.Serialize(stream, this.Cars);
        }
    }

    public IList<Car> GetCars()
    {
        return this.Cars;
    }

    public void UpdateCar(Car carToUpdate)
    {
        Car updateCar = this.Cars.SingleOrDefault(car => car.ID == carToUpdate.ID);

        if (updateCar != null)
        {
            // Employ advantage of List - Remove and Add Functions! Not a real application
            // No need for any validations
            this.Cars.Remove(updateCar);
            this.Cars.Add(carToUpdate);
            SaveCars();
        }
    }

    public void CreateCar(Car carToAdd)
    {
        int lastCarId = this.Cars.Max(car => car.ID);
        carToAdd.ID = lastCarId + 1;
        this.Cars.Add(carToAdd);
        SaveCars();
    }

    public void DeleteTweet(int carId)
    {
        Car deleteCar = this.Cars.SingleOrDefault(car => car.ID == carId);
        this.Cars.Remove(deleteCar);
        SaveCars();
    }
}