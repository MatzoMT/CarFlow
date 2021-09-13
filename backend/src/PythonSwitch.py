class PythonSwitch:
    def lexus(self, model):
        result = "".join(filter(lambda x: not x.isdigit(), model))
        return result