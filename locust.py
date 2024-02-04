from locust import HttpUser, task, between

class MyUser(HttpUser):
    wait_time = between(.5, 1)  # Tiempo de espera entre las peticiones

    @task
    def my_task(self):
        # Define aquí la petición que deseas realizar
        # Por ejemplo, una petición GET a la raíz del servidor:
        self.client.get("/products/puntopizza")
        self.client.get("/locals/puntopizza")
