using System;
using System.Collections.Generic;
using System.Linq;


namespace RestService
{
     public class RestService : IRestService
    {
        public RestService()
        {

        }


        public List<Car> GetCars()
        {
            var cars = new List<Car>();
            var data = new Repo();

            cars = data.GetCars().ToList();
            Console.WriteLine(cars.ToString());
            return cars;
        }

        public List<Car> AddCar(Car newCar)
        {
            var cars = new List<Car>();
            var data = new Repo();
            try
            {
                data.CreateCar(newCar);
                cars = data.GetCars().ToList();
            }
            catch (Exception e)
            {

                throw e;
            }
           
            return cars;
        }
    }
}
