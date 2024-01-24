var app=angular.module("Memories",[]);
app.controller("MemoryController",['$scope','$filter',function($scope,$filter){
    $scope.inputMemory={};
    $scope.inputSearchDate;
     $scope.memoryId=0;
    $scope.memories=[]
    $scope.filteredMemories=[];
    $scope.currentDate='';
    $scope.todayDate=new Date().toISOString().split('T')[0];
    $scope.day;
    $scope.memory={};
    constructor();
    
    
    function constructor(){
        $scope.day = $filter('date')(new Date(), 'EEE').toUpperCase();
        const storedMemories = localStorage.getItem('myMemories');
        if (storedMemories) {
            const localStore = JSON.parse(storedMemories);
            $scope.memories = localStore.map(memory => ({
                ...memory,
                date: new Date(memory.date)
            }));
    }
    }
    

    assignTodayMemoriee();
        function assignTodayMemoriee(){
            const todayDate=new Date();
            const today=formatDateToYYYYMMDD(todayDate);
        }


        function todayMemories(){
            $scope.filteredMemories=[];
            var today1=new Date();
            var today=formatDateToYYYYMMDD(today1);
            for(var i=0;i<$scope.memories.length;i++){
                var memory=$scope.memories[i];
                var memoryDate=formatDateToYYYYMMDD(memory.date);
                if(today === memoryDate ){
                    $scope.filteredMemories.unshift(memory);
                }
            }
        }


    $scope.isToday = function (day) {
        return $scope.day === day;
    };

    $scope.editMemory = function (memory) {
        $scope.memory=memory;
        $('#myModal').modal('show'); 

    };
   
    $scope.submitForm=function(){
console.log($scope.inputMemory.title);
console.log($scope.inputMemory.currentDate);
console.log($scope.inputMemory.description);

        if($scope.inputMemory.title===undefined || $scope.inputMemory.currentDate===null || $scope.inputMemory.description===undefined){
            alert("fill out every details");
        }
        else{
        const saveMemory={
            title:$scope.inputMemory.title,
        date:new Date($scope.inputMemory.currentDate),
        description:$scope.inputMemory.description
        }
        console.log(saveMemory);
        $scope.memories.unshift(saveMemory);
        localStorage.setItem('myMemories', JSON.stringify($scope.memories));

        todayMemories();
        updateLocalStorage();
        
        filteredMemoriesByDate(new Date($scope.inputMemory.currentDate));
        $scope.inputMemory={};
    }
    }

        
    $scope.deleteMemory = function(memory) {
        var index = $scope.memories.indexOf(memory);
        if (index !== -1) {
            $scope.memories.splice(index, 1);
            updateLocalStorage();
        }
        var indexSelected=$scope.filteredMemories.indexOf(memory);
        if(indexSelected !== -1){
            $scope.filteredMemories.splice(indexSelected,1);
        }

    }
    function updateLocalStorage() {
        localStorage.setItem('myMemories', JSON.stringify($scope.memories));
    }

    $scope.filterMemories = function () {
        $scope.filteredMemories=[];
        var search=new Date($scope.inputSearchDate);
        filteredMemoriesByDate(search);
    };
    function filteredMemoriesByDate(searchDate){
        $scope.filteredMemories=[];
        $scope.day=$filter('date')(searchDate, 'EEE').toUpperCase();
        console.log($scope.day);
        const inputDate=formatDateToYYYYMMDD(searchDate);
        console.log(inputDate);
        for( memory of $scope.memories){
            const memoryDate=formatDateToYYYYMMDD(memory.date);    
            if(memoryDate===inputDate){
                $scope.filteredMemories.unshift(memory);
            }
        }
    }
    function formatDateToYYYYMMDD(date) {
        if (!(date instanceof Date) || isNaN(date)) {
            return null; 
        }
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }
    $scope.updateMemory=function(){
        var title=document.getElementById('updateTitle').value;
        var description=document.getElementById('updateDescription').value;
        $scope.memory.title=title;
        $scope.memory.description=description;
    }

}])