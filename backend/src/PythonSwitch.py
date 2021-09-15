class PythonSwitch:
    def lexus(self, model):
        result = "".join(filter(lambda x: not x.isdigit(), model))
        return result
    
    # Ford F-150, F-250, F-350, F-450
    def f_series(self):
        return "f-series"